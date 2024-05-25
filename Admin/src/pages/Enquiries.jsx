import React, { useEffect } from "react";
import { Table, Space, Button, Dropdown, Menu, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries, deleteComment } from "../features/enquiry/enquirySlice";

const Enquiries = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const enqState = useSelector((state) => state.enquiry.enquiries);

  const handleDeleteComment = (userId) => {
    confirmAction(() => {
      dispatch(deleteComment(userId))
        .then(() => {
          message.success("Comment deleted successfully!");
        })
        .catch((error) => {
          message.error(`Failed to delete Comment: ${error.message}`);
        });
    });
  };

  // Define columns outside of the component
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "fullname",
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
      title: "Comment",
      dataIndex: "comment",
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

  // Map enquiry data to table data
  const data = enqState.map((enquiry, index) => ({
    key: enquiry._id,
    fullname: enquiry.fullname,
    email: enquiry.email,
    mobile: enquiry.mobile,
    comment: enquiry.comment,
  }));
  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDeleteComment(record.key)}>
        Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <h3 className="mb-4 title">User Comments</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Enquiries;

// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getEnquiries,
//   resetState,
//   // getEnquiries,
//   // resetState,
//   // updateAEnquiry,
// } from "../features/enquiry/enquirySlice";
// import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import CustomModal from "../components/CustomModal";

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//   },
//   {
//     title: "Mobile",
//     dataIndex: "mobile",
//   },
//   {
//     title: "Staus",
//     dataIndex: "status",
//   },

//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

// const Enquiries = () => {
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [enqId, setenqId] = useState("");
//   const showModal = (e) => {
//     setOpen(true);
//     setenqId(e);
//   };

//   const hideModal = () => {
//     setOpen(false);
//   };
//   useEffect(() => {
//     dispatch(resetState());
//     dispatch(getEnquiries());
//   }, []);
//   const enqState = useSelector((state) => state.enquiry.enquiries);
//   const data1 = [];
//   for (let i = 0; i < enqState.length; i++) {
//     data1.push({
//       key: i + 1,
//       fullname: enqState[i].fullname,
//       email: enqState[i].email,
//       mobile: enqState[i].mobile,
//       comment: enqState[i].comment,
//       status: (
//         <>
//           <select
//             name=""
//             defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
//             className="form-control form-select"
//             id=""
//             onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
//           >
//             <option value="Submitted">Submitted</option>
//             <option value="Contacted">Contacted</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Resolved">Resolved</option>
//           </select>
//         </>
//       ),

//       action: (
//         <>
//           <Link
//             className="ms-3 fs-3 text-blue"
//             to={`/admin/enquiries/${enqState[i]._id}`}
//           >
//             <AiOutlineEye />
//           </Link>
//           <button
//             className="ms-3 fs-3 text-danger bg-transparent border-0"
//             onClick={() => showModal(enqState[i]._id)}
//           >
//             <AiFillDelete />
//           </button>
//         </>
//       ),
//     });
//   }
//   // const setEnquiryStatus = (e, i) => {
//   //   console.log(e, i);
//   //   const data = { id: i, enqData: e };
//   //   dispatch(updateAEnquiry(data));
//   // };
//   // const deleteEnq = (e) => {
//   //   dispatch(deleteAEnquiry(e));
//   //   setOpen(false);
//   //   setTimeout(() => {
//   //     dispatch(getEnquiries());
//   //   }, 100);
//   // };
//   return (
//     <div>
//       <h3 className="mb-4 title">Enquiries</h3>
//       <div>
//         <Table columns={columns} dataSource={data1} />
//       </div>
//       <CustomModal
//         hideModal={hideModal}
//         open={open}
//         performAction={() => {
//           deleteEnq(enqId);
//         }}
//         title="Are you sure you want to delete this enquiry?"
//       />
//     </div>
//   );
// };

// export default Enquiries;
