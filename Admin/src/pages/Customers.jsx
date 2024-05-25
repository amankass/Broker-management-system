import React, { useEffect } from "react";
import { Table, Space, Button, Dropdown, Menu, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../features/customers/customerSlice";

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
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

  const handleDeleteUser = (userId) => {
    confirmAction(() => {
      dispatch(deleteUser(userId))
        .then(() => {
          message.success("User deleted successfully!");
        })
        .catch((error) => {
          message.error(`Failed to delete User: ${error.message}`);
        });
    });
  };

  const customerstate = useSelector((state) => state.customer.customers)
    .filter((customer) => customer.role !== "admin")
    .map((customer, index) => ({
      key: customer._id,
      name: `${customer.fname} ${customer.lname}`,
      email: customer.email,
      mobile: customer.mobile,
      username: customer.username,
    }));
  const data1 = customerstate;

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDeleteUser(record.key)}>
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
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Username",
      dataIndex: "username",
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
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
