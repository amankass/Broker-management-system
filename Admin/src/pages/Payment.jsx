import React, { useEffect } from "react";
import { Table, Space, Button, message, Dropdown, Menu, Modal } from "antd";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePayment, getPaymet } from "../features/blogs/blogSlice";
//import CustomModal from "../components/CustomModal";

const Paymentlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymet());
  }, []);

  const handleDeletePayment = (userId) => {
    confirmAction(() => {
      dispatch(deletePayment(userId))
        .unwrap()
        .then(() => {
          message.success("Payment deleted successfully!");
        })
        .catch((error) => {
          message.error(`Failed to delete Payment: ${error.message}`);
        });
    });
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

  const getBlogState = useSelector((state) => state.blogs.blogs).map(
    (customer, i) => ({
      key: customer._id,
      name: `${customer.fname} ${customer.lname}`,
      email: customer.email,
      amount: customer.amount,
      //username: customer.username,
    })
  );
  const data1 = getBlogState;

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDeletePayment(record.key)}>
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
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Amount",
      dataIndex: "amount",
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

  return (
    <div>
      <h3 className="mb-4 title">Payment List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Paymentlist;
