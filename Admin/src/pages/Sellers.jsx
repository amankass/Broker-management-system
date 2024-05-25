import React, { useEffect, useState } from "react";
import { Table, Space, Button, Dropdown, Menu, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getBroker,
  deleteBroker,
  updateBrokerStatus,
} from "../features/Brokers/brokerSlice";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Bar } from "@ant-design/charts";

const Brokers = () => {
  const dispatch = useDispatch();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [actionCounts, setActionCounts] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
    delete: 0,
  });

  useEffect(() => {
    dispatch(getBroker());
  }, [dispatch]);

  const brokerState = useSelector((state) => state.broker.brokers);
  const data2 = brokerState.map((broker) => ({
    key: broker._id,
    name: `${broker.fname} ${broker.lname}`,
    email: broker.email,
    mobile: broker.mobile,
    username: broker.username,
    experiance: broker.experiance,
    TaxTinNo: broker.TaxTinNo,
    TypeofBroker: broker.TypeofBroker,
    status: broker.status,
    imageUrls: broker.imageUrls,
  }));
  const handleImageClick = (imageUrls) => {
    setLightboxImages(imageUrls.map((url) => ({ src: url })));
    setLightboxOpen(true);
  };

  const confirmAction = (actionFn) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you really want to continue with this action?",
      onOk() {
        actionFn();
      },
      onCancel() {
        message.info("Action cancelled");
      },
    });
  };

  const handleDeleteBroker = (userId) => {
    confirmAction(() => {
      dispatch(deleteBroker(userId))
        .unwrap()
        .then(() => {
          message.success("Broker deleted successfully!");
          setActionCounts((prevCounts) => ({
            ...prevCounts,
            delete: prevCounts.delete + 1,
          }));
        })
        .catch((error) => {
          message.error(`Failed to delete broker: ${error.message}`);
        });
    });
  };

  const handleUpdateStatus = (userId, status) => {
    confirmAction(() => {
      dispatch(updateBrokerStatus({ userId, status }))
        .unwrap()
        .then(() => {
          message.success("Broker status updated successfully!");
          setActionCounts((prevCounts) => ({
            ...prevCounts,
            [status]: prevCounts[status] + 1,
          }));
        })
        .catch((error) => {
          message.error(`Failed to update broker status: ${error.message}`);
        });
    });
  };
  const actionMenu = (record) => (
    <Menu>
      <Menu.Item
        key="approve"
        onClick={() => handleUpdateStatus(record.key, "approved")}
      >
        Approve
      </Menu.Item>
      <Menu.Item
        key="pending"
        onClick={() => handleUpdateStatus(record.key, "pending")}
      >
        Pending
      </Menu.Item>
      <Menu.Item
        key="reject"
        onClick={() => handleUpdateStatus(record.key, "rejected")}
      >
        Reject
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDeleteBroker(record.key)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Experience",
      dataIndex: "experiance",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "TypeofBroker",
      dataIndex: "TypeofBroker",
    },
    {
      title: "Image",
      dataIndex: "imageUrls",
      render: (imageUrls) => (
        <img
          src={imageUrls[0]}
          alt="Broker"
          style={{ width: 100, height: 60, cursor: "pointer" }}
          onClick={() => handleImageClick(imageUrls)}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={actionMenu(record)} trigger={["click"]}>
            <Button type="primary">Actions</Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const chartConfig = {
    data: [
      { action: "Approved", count: actionCounts.approved },
      { action: "Pending", count: actionCounts.pending },
      { action: "Rejected", count: actionCounts.rejected },
      { action: "Deleted", count: actionCounts.delete },
    ],
    xField: "count",
    yField: "action",
    seriesField: "action",
    colorField: "action",
    legend: { position: "top-left" },
  };

  return (
    <div>
      <h3 className="mb-4 title">Brokers</h3>
      <div>
        <Table columns={columns} dataSource={data2} />
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
        />
      </div>
      <div>
        <h4 className="mt-4">Broker Actions Distribution</h4>
        <Bar {...chartConfig} />
      </div>
    </div>
  );
};

export default Brokers;
