import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Space, Table, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCarListing,
  getCarlist,
} from "../features/CarListing/CarlistSlice";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const CarList = () => {
  const dispatch = useDispatch();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);

  useEffect(() => {
    dispatch(getCarlist());
  }, [dispatch]);

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
  const handleDeleteCar = (userId) => {
    confirmAction(() => {
      dispatch(deleteCarListing(userId))
        .unwrap()
        .then(() => {
          message.success("Car deleted successfully!");
        })
        .catch((error) => {
          message.error(`Failed to delete Car: ${error.message}`);
        });
    });
  };

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDeleteCar(record.key)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const customerstate = useSelector((state) => state.carList.carLists);
  const data1 = customerstate
    .filter((carList) => carList.role !== "admin")
    .map((carList) => ({
      key: carList._id,
      model: carList.model,
      year: carList.year,
      mileage: carList.mileage,
      regularPrice: carList.regularPrice,
      discountPrice: carList.discountPrice,
      address: carList.address,
      condition: carList.condition,
      transmission: carList.transmission,
      fuelType: carList.fuelType,
      type: carList.type,
      color: carList.color,
      description: carList.description,
      offer: carList.offer,
      engineCapacity: carList.engineCapacity,
      imageUrls: carList.imageUrls,
      userRef: carList.userRef,
    }));

  const handleImageClick = (imageUrls) => {
    setLightboxImages(imageUrls.map((url) => ({ src: url })));
    setLightboxOpen(true);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Mileage",
      dataIndex: "mileage",
    },
    {
      title: "Regular Price",
      dataIndex: "regularPrice",
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Condition",
      dataIndex: "condition",
    },
    {
      title: "Transmission",
      dataIndex: "transmission",
    },
    {
      title: "Fuel Type",
      dataIndex: "fuelType",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Description",
      dataIndex: "description",
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
      title: "Engine Capacity",
      dataIndex: "engineCapacity",
    },
    {
      title: "Broker Id",
      dataIndex: "userRef",
    },
    {
      title: "Actions",
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
      <h3 className="mb-4 title">Car List</h3>
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

export default CarList;
