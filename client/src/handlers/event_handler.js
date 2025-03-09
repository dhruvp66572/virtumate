// src/api/eventService.js

import axiosInstance from "../utils/axiosIntance";

// Fetch all events
const getAllEvents = async () => {
  try {
    const response = await axiosInstance.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Fetch a specific event by ID
const getEventById = async (id) => {
  try {
    const response = await axiosInstance.get(`/events/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
};

// Create a new event
const createEvent = async (formData) => {
  try {
    const response = await axiosInstance.post('/events', formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update an event by ID
const updateEventById = async (formData, id) => {
  try {
    console.log(`Updating event with ID ${id}`);
    const response = await axiosInstance.put(`/events/${id}`, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating event with ID ${id}:`, error);
    throw error;
  }
};

// Delete an event by ID
const deleteEventById = async (id) => {
  try {
    console.log(`Deleting event with ID ${id}`);
    const response = await axiosInstance.delete(`/events/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw error;
  }
};

export {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
};
