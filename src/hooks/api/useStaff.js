import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constant/Utils";

// Define a custom hook for managing staff-related operations
export const useStaff = () => {
  // const token = localStorage.getItem('token')
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJLYXJvQGdtYWlsLmNvbSIsImVtYWlsIjoiS2Fyb0BnbWFpbC5jb20iLCJuYmYiOjE2OTc0MTgwNDAsImV4cCI6MTY5NzQxODY0MCwiaWF0IjoxNjk3NDE4MDQwLCJpc3MiOiJNeVRhdmVsQXBwIiwiYXVkIjoiTXlUYXZlbEFwcCJ9.Q_MUJ4_C0Ctj8gxSW1-xsQoKpz5C4VpaytRS9G4Om-M1hAeLwA0930mAg-zTy3EKzQMMDkqMtP4jC0GqmaRPGA";

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
      .get(BACKEND_URL + "staff/")
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
