import axios from "axios";
import React from "react";

const BACKEND_URL = "https://localhost:7015/api/reservations";

export const useReservation = () => {
  const addReservation = async (newReservation) => {
    try {
      const response = await axios.post(BACKEND_URL, newReservation);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const updateStaffMember = (resId, updatedReservation) => {
    return axios
      .put(BACKEND_URL + "/" + resId, updatedReservation)
      .then((response) => {
        if (response.data) {
            if(response.data === "Staff member detials updated!"){
                return true;
            }
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return false
      });
  };

  const getTravelHistoryById = async (travelerId) => {
    try {
      const response = await axios.get(BACKEND_URL + "/traveler/" + travelerId + "/history");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const getUpcomingTravelById = async (travelerId) => {
    try {
      const response = await axios.get(BACKEND_URL + "/traveler/" + travelerId + "/upcoming");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const getStaffMemberById = (staffId) => {
    return axios
      .get(BACKEND_URL + "/" + staffId)
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

  const deactivateStaffMember = (staffId) => {};

  const getAllReservations = () => {
    return axios
      .get(BACKEND_URL)
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

  const getTrainAvailability = async (travelerId) => {
    try {
      const response = await axios.get(BACKEND_URL + "/traveler/" + travelerId + "/upcoming");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  return {
    addReservation,
    updateStaffMember,
    getStaffMemberById,
    getTravelHistoryById,
    getUpcomingTravelById,
    deactivateStaffMember,
    getAllReservations,
    getTrainAvailability,
  };
};
