import axios from "axios";
import { base_url } from "../../utils/base_url";
const createBroker = async (broker) => {
  console.log(broker);
  const response = await axios.post(`${base_url}auth/SignUp`, broker);
  return response.data;
};
const getBroker = async () => {
  const response = await axios.get(`${base_url}auth/get`);
  return response.data;
};

const deleteBroker = async (userId) => {
  const response = await axios.get(`${base_url}auth/delete/${userId}`);
  return response.data;
};

const updateBrokerStatus = async (userId, status) => {
  const response = await axios.patch(`${base_url}auth/update/${userId}`, {
    status,
  });
  return response.data;
};

const brokerService = {
  getBroker,
  deleteBroker,
  updateBrokerStatus,
  createBroker,
};

export default brokerService;
