import axios from "axios";
import React from "react";

const BACKEND_URL = "https://localhost:7015/api/reservations";

export const useReservation = () => {
  const addReservation = async (newReservation) => {
    try {
      const response = await axios.post(BACKEND_URL, newReservation);
      return "Reservation made successfully!";
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const updateReservation = async (resId, updatedReservation) => {
    try {
      const response = await axios.put(BACKEND_URL + "/" + resId, updatedReservation);
      return "Reservation updated successfully!";
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const deleteReservation = async (resId) => {
    try {
      const response = await axios.delete(BACKEND_URL + "/" + resId);
      return "Reservation deleted successfully!";
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

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

  const getTrainAvailability = async (departure, arrival, date, ticketClass, ticketCount) => {
    const url = "https://localhost:7015/api/trains/availability";
    const params = {
      departure,
      arrival,
      date,
      ticketClass,
      ticketCount
    };
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  return {
    addReservation,
    updateReservation,
    deleteReservation,
    getTravelHistoryById,
    getUpcomingTravelById,
    getTrainAvailability,
  };
};
