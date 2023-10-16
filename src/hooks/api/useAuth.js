import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../constant/Utils";

export const useAuth = () => {
  const staffLogin = async (staffDetails) => {
    return await axios
      .post(BACKEND_URL + "login/staff", staffDetails)
      .then((response) => {
        if (response.data) {
          return response;
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  };

  return { staffLogin };
};
