import axios from "axios";
import React from "react";

const BACKEND_URL = "https://localhost:7015/api/staff";

export const useStaff = () => {
  const registerStaffMember = async (staffDetails) => {
    return await axios
      .post(BACKEND_URL, staffDetails)
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

  const updateStaffMember = (staffId, staffDetails) => {
    return axios
      .put(BACKEND_URL + "/" + staffId, staffDetails)
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

  const getAllStaffMembers = () => {
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
    registerStaffMember,
    updateStaffMember,
    getStaffMemberById,
    deactivateStaffMember,
    getAllStaffMembers,
  };
};
