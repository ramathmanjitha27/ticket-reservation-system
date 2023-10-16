import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants/apiConstanst";

// Define a custom hook for managing staff-related operations
export const useStaff = () => {
  const STAFF_API_URL = BACKEND_URL + "staff/";

  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Define the headers for the HTTP requests
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // Function to register a new staff member
  const registerStaffMember = async (staffDetails) => {
    return await axios
      .post(STAFF_API_URL, staffDetails) // Send a POST request to the backend with staff details
      .then((response) => {
        if (response.data) {
          return response.data; // Return the response data (e.g., newly registered staff member)
        } else {
          return {}; // Return an empty object if there's no response data
        }
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  };

  // Function to update an existing staff member's details
  const updateStaffMember = (staffId, staffDetails) => {
    return axios
      .put(STAFF_API_URL + staffId, staffDetails, { headers })
      .then((response) => {
        if (response.data) {
          if (response.data === "Staff member detials updated!") {
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

  // Function to retrieve staff member details by their ID
  const getStaffMemberById = (staffId) => {
    return axios
      .get(STAFF_API_URL + staffId, { headers })
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

  // Function to retrieve details of all staff members
  const getAllStaffMembers = () => {
    return axios
      .get(STAFF_API_URL, { headers })
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

  const deleteStaffMember = (staffId) => {
    return axios
      .delete(STAFF_API_URL + staffId, { headers })
      .then((response) => {
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  // Return an object with the functions for external use
  return {
    registerStaffMember,
    updateStaffMember,
    getStaffMemberById,
    getAllStaffMembers,
    deleteStaffMember
  };
};
