import axios from "axios";
import { BACKEND_URL } from "../../constants/apiConstants";

// Define a set of functions related to train data management
export const useTrain = () => {
  const TRAIN_API_URL = BACKEND_URL + "/trains";

  // Function to create a new train
  const createTrain = async (newTrain) => {
    return await axios
      .post(TRAIN_API_URL, newTrain)
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
      .put(TRAIN_API_URL + "/" + id, updateTrain)
      .then((response) => {
        if (response.data) {
          if (response.data === "Train details updated") {
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
      .get(TRAIN_API_URL + "/" + id)
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
      .get(TRAIN_API_URL)
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
      .put(TRAIN_API_URL + "/setActiveStatus" + id)
      .then((response) => {
        if (response.data) {
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
    createTrain,
    updateTrain,
    getTrainById,
    cancelTrain,
    getAllTrains,
  };
};
