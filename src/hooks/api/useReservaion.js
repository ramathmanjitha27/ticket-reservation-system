import axios from "axios";
import React from "react";

const BACKEND_URL = "https://localhost:7015/api/reservations";

export const useReservation = () => {
  const addReservation = async (newReservation) => {
    return await axios
      .post(BACKEND_URL, newReservation)
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
        // return alert("Error: " + error);
        return {};
      });
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

  return {
    addReservation,
    updateStaffMember,
    getStaffMemberById,
    deactivateStaffMember,
    getAllStaffMembers,
  };
};
