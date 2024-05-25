import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
  const response = await axios.get(`${base_url}auth/`);

  return response.data;
};
const deleteUser = async (userId) => {
  const response = await axios.get(`${base_url}auth/udelete/${userId}`);
  return response.data;
};

const customerService = {
  getUsers,
  deleteUser,
};

export default customerService;
