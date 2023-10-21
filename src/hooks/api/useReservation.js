import axios from "axios";
import React from "react";

// const BACKEND_URL = "https://localhost:7015/api/reservations";
const BACKEND_URL = "http://192.168.8.158:81/api/reservations";

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
    // const url = "https://localhost:7015/api/trains/availability";
    const url = "http://192.168.8.158:81/api/trains/availability";
    const newSearch = {
      departure,
      arrival,
      date,
      ticketClass,
      ticketCount
    };
    try {
      const response = await axios.post(url, newSearch);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const updateTicketCount = async (trainId, ticketClass, ticketCount, ticketAction) => {
    // const url = "https://localhost:7015/api/trains/updateCount/" + trainId;
    const url = "http://192.168.8.158:81/api/trains/updateCount/" + trainId;
    console.log(url);
    console.log(trainId, ticketClass, ticketCount, ticketAction);
    const countUpdate = {      
      ticketClass,
      ticketCount,
      id: trainId,
      ticketAction
    };
    try {
      const response = await axios.put(url, countUpdate);
      return "Ticket count updated";
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }  
    

  return {
    addReservation,
    updateReservation,
    deleteReservation,
    getTravelHistoryById,
    getUpcomingTravelById,
    getTrainAvailability,
    updateTicketCount
  };
};
