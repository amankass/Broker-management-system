//import { config } from "../../utils/axiosconfig";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getPaymet = async () => {
  const response = await axios.get(`${base_url}payment/gett`);
  return response.data;
};
const deletePayment = async (userId) => {
  const response = await axios.delete(`${base_url}payment/deletee/${userId}`);
  return response.data;
};
const blogService = {
  getPaymet,
  deletePayment,
};

export default blogService;

// const getBlogs = async () => {
//   const response = await axios.get(`${base_url}blog/`);
//   return response.data;
// };
// const createBlog = async (blog) => {
//   const response = await axios.post(`${base_url}blog/`, blog, config);
//   return response.data;
// };
// const updateBlog = async (blog) => {
//   const response = await axios.put(
//     `${base_url}blog/${blog.id}`,
//     {
//       title: blog.blogData.title,
//       description: blog.blogData.description,
//       category: blog.blogData.category,
//       images: blog.blogData.images,
//     },
//     config
//   );

//   return response.data;
// };
// const getBlog = async (id) => {
//   const response = await axios.get(`${base_url}blog/${id}`, config);

//   return response.data;
// };

// const deleteBlog = async (id) => {
//   const response = await axios.delete(`${base_url}blog/${id}`, config);

//   return response.data;
// };
