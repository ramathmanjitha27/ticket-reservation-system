import axios from "axios";
import { BACKEND_URL } from "../../constants/apiConstanst";

// Define a set of functions related to train data management
export const useTrain = () => {
  const TRAIN_API_URL = BACKEND_URL + "/trains";

  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Define the headers for the HTTP requests
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // Function to create a new train
  const createTrainAPI = async (newTrain) => {
    return await axios
      .post(TRAIN_API_URL, newTrain, { headers })
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  };

  // Function to update an existing train
  const updateTrain = (id, updateTrain) => {
    return axios
      .put(TRAIN_API_URL + "/" + id, updateTrain, { headers })
      .then((response) => {
        if (response.data) {
          if (response.data === "Successs") {
            return true;
          }
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  // Function to retrieve train data by ID
  const getTrainById = (id) => {
    return axios
      .get(TRAIN_API_URL + "/" + id, { headers })
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  };

  // Function to retrieve a list of all trains
  const getAllTrains = () => {
    return axios
      .get(TRAIN_API_URL, { headers })
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
  const cancelTrain = (id) => {
    return axios
      .put(TRAIN_API_URL + "/setActiveStatus/" + id, { headers })
      .then((response) => {
        if (response.data == "CANCELLED") {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  };

  // Expose the defined functions for external use
  return {
    createTrainAPI,
    updateTrain,
    getTrainById,
    cancelTrain,
    getAllTrains,
  };
};
