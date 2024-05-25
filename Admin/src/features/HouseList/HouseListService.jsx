import axios from "axios";
import { base_url } from "../../utils/base_url";

const getHouse = async () => {
  const response = await axios.get(`${base_url}houeslist/get`);
  return response.data;
};
const deleteHouseListing = async (userId) => {
  const response = await axios.delete(`${base_url}houeslist/delete/${userId}`);
  return response.data;
};

const HouseService = {
  getHouse,
  deleteHouseListing,
};

export default HouseService;
