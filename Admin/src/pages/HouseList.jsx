import React, { useEffect, useState } from "react";
import { Table, Space, Button, Dropdown, Menu, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHouseListing,
  getHouse,
} from "../features/HouseList/HouselistSlice";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const HouseList = () => {
  const dispatch = useDispatch();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);

  useEffect(() => {
    dispatch(getHouse());
  }, []);

  const customerstate = useSelector((state) => state.houseList.houseLists);
  const data1 = customerstate
    .filter((houseList) => houseList.role !== "admin")
    .map((houseList, index) => ({
      key: houseList._id,
      name: houseList.name,
      description: houseList.description,
      address: houseList.address,
      regularPrice: houseList.regularPrice,
      discountPrice: houseList.discountPrice,
      bathrooms: houseList.bathrooms,
      bedrooms: houseList.bedrooms,
      userRef: houseList.userRef,
      parking: houseList.parking,
      type: houseList.type,
      imageUrls: houseList.imageUrls,
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

  const handleDeleteHouse = (userId) => {
    confirmAction(() => {
      dispatch(deleteHouseListing(userId))
        .unwrap()
        .then(() => {
          message.success("House deleted successfully!");
        })
        .catch((error) => {
          message.error(`Failed to delete House: ${error.message}`);
        });
    });
  };

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDeleteHouse(record.key)}>
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
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "RegularPrice",
      dataIndex: "regularPrice",
    },
    {
      title: "DiscountPrice",
      dataIndex: "discountPrice",
    },
    {
      title: "Bathrooms",
      dataIndex: "bathrooms",
    },
    {
      title: "Bedrooms",
      dataIndex: "bedrooms",
    },
    {
      title: "BrokerId",
      dataIndex: "userRef",
    },
    {
      title: "Parking",
      dataIndex: "parking",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Image",
      dataIndex: "imageUrls",
      render: (imageUrls) => (
        <img
          src={imageUrls[0]}
          alt="Car"
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
  console.log(data1);
  console.log(columns);
  return (
    <div>
      <h3 className="mb-4 title">House List </h3>
      <div>
        <Table columns={columns} dataSource={data1} />
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
        />
      </div>
    </div>
  );
};
export default HouseList;
