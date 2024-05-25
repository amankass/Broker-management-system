import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCarlist = async () => {
  const response = await axios.get(`${base_url}carlist/get`);
  return response.data;
};
const deleteCarListing = async (userId) => {
  const response = await axios.delete(`${base_url}carlist/delete/${userId}`);
  return response.data;
};

const carService = {
  getCarlist,
  deleteCarListing,
};

export default carService;
