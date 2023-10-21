import axios from "axios";
import { BACKEND_URL } from "../../constants/apiConstanst";

// Define a set of functions related to train data management
export const useTraveler = () => {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Define the headers for the HTTP requests
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // Function to retrieve a list of all trains
  const getAllTravelers = () => {
    return axios
      .get(BACKEND_URL + "/traveler", { headers })
      .then((response) => {
        if (response.data.length > 0) {
          return response.data;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  // Function to cancel a train by setting its active status
  const changeStatusTraveler = (id) => {
    return axios
      .post(BACKEND_URL + "/traveler" + `/${id}/activate`, { headers })
      .then((response) => {
        return response.data.isActive;
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  };

  // Expose the defined functions for external use
  return {
    getAllTravelers,
    changeStatusTraveler,
  };
};
