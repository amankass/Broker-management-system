import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
import { getBroker } from "../features/Brokers/brokerSlice";
import { getCarlist } from "../features/CarListing/CarlistSlice";
import { getHouse } from "../features/HouseList/HouselistSlice";
import { getPaymet } from "../features/blogs/blogSlice";
import { Link } from "react-router-dom";
import { getEnquiries } from "../features/enquiry/enquirySlice";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `pending.`,
  });
}

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetch users data
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Fetch brokers data
  useEffect(() => {
    dispatch(getBroker());
  }, [dispatch]);

  // Fetch cars data
  useEffect(() => {
    dispatch(getCarlist());
  }, [dispatch]);

  // Fetch House data
  useEffect(() => {
    dispatch(getHouse());
  }, []);
  // Fetch Payment data
  useEffect(() => {
    dispatch(getPaymet());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const userData = useSelector((state) => state.customer.customers)
    .filter((customer) => customer.role !== "admin")
    .map((customer, index) => ({
      key: customer._id,
      name: `${customer.fname} ${customer.lname}`,
      email: customer.email,
      mobile: customer.mobile,
      username: customer.username,
    }));

  const brokerData = useSelector((state) => state.broker.brokers);

  const carData = useSelector((state) => state.carList.carLists);

  const houseData = useSelector((state) => state.houseList.houseLists);

  const getBlogState = useSelector((state) => state.blogs.blogs);

  const enqState = useSelector((state) => state.enquiry.enquiries);

  const data = [
    {
      type: "Users",
      count: userData.length,
    },
    {
      type: "Brokers",
      count: brokerData.length,
    },
    {
      type: "Car Lists",
      count: carData.length,
    },
    {
      type: "House Lists",
      count: houseData.length,
    },
    {
      type: "Payers",
      count: getBlogState.length,
    },
    {
      type: "Enquiries",
      count: enqState.length,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "count",
    color: ({ type }) => {
      switch (type) {
        case "Users":
          return "#FF6384";
        case "Brokers":
          return "#36A2EB";
        case "Car Lists":
          return "#FFCE56";
        case "House Lists":
          return "#4BC0C0";
        case "Payers":
          return "#9966FF";
        case "Enquiries":
          return "#9966FF";
        default:
          return "#999999";
      }
    },
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Category",
      },
      count: {
        alias: "Count",
      },
    },
  };

  const recentListingsData = [...carData, ...houseData].map((item, index) => ({
    key: index,
    name: item.name,
    model: item.model,
    description: item.description,
    address: item.address,
    regularPrice: item.regularPrice,
  }));

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
      title: "Model",
      dataIndex: "model",
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
  ];
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div
        className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
        style={{ fontWeight: "bold" }}
      >
        <Link
          to="customers"
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div>
            <p className="desc">Number of Users</p>
            <h4 className="mb-0 sub-title" style={{ color: "red" }}>
              {userData.length}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </Link>

        <Link
          to="sellers"
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div>
            <p className="desc">Number of Brokers</p>
            <h4 className="mb-0 sub-title" style={{ color: "red" }}>
              {brokerData.length}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 31%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </Link>

        <Link
          to="carlisting"
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div>
            <p className="desc">Number of Car Lists</p>
            <h4 className="mb-0 sub-title" style={{ color: "red" }}>
              {carData.length}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 30%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </Link>

        <Link
          to="houselist"
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div>
            <p className="desc">Number of House Lists</p>
            <h4 className="mb-0 sub-title" style={{ color: "red" }}>
              {houseData.length}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 30%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </Link>

        <Link
          to="blog-list"
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div>
            <p className="desc">Number of Payers</p>
            <h4 className="mb-0 sub-title" style={{ color: "red" }}>
              {getBlogState.length}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 30%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </Link>
        <Link
          to="enquiries"
          className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div>
            <p className="desc">Number of Message</p>
            <h4 className="mb-0 sub-title" style={{ color: "red" }}>
              {enqState.length}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 30%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">System Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Listings</h3>
        <div>
          <Table columns={columns} dataSource={recentListingsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
