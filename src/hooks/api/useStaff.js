import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constant/Utils";

// Define a custom hook for managing staff-related operations
export const useStaff = () => {
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
      .post(BACKEND_URL + "staff/", staffDetails) // Send a POST request to the backend with staff details
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
      .put(BACKEND_URL + "staff/" + staffId, staffDetails, { headers })
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
      .get(BACKEND_URL + "staff/" + staffId, { headers })
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
      .get(BACKEND_URL + "staff/", { headers })
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

  // Return an object with the functions for external use
  return {
    registerStaffMember,
    updateStaffMember,
    getStaffMemberById,
    getAllStaffMembers,
  };
};
