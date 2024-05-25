import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
const getEnquiries = async () => {
  const response = await axios.get(`${base_url}auth/getcomment`);
  return response.data;
};
const deleteComment = async (userId) => {
  const response = await axios.delete(`${base_url}auth/deletecomment/${userId}`);
  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteComment,
  // udpateEnquiry,
};








// const deleteEnquiry = async (id) => {
//   const response = await axios.delete(`${base_url}enquriy/${id}`, config);
//   return response.data;
// };
// const getEnquiry = async (id) => {
//   const response = await axios.get(`${base_url}enquriy/${id}`);
//   return response.data;
// };
// const udpateEnquiry = async (enq) => {
//   const response = await axios.put(
//     `${base_url}enquriy/${enq.id}`,
//     { status: enq.enqData },
//     config
//   );
//   return response.data;
// };


export default enquiryService;
