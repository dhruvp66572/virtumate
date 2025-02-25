import axios from "axios";

const getallEvents = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/events/",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response;
};

const getEventById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/events/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  console.log(response);
};

const createEvent = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/events/",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  console.log(response);
  return response;
};

const updateEventById = async (formData, id) => {
  console.log(id);

  const response = await axios.put(
    `http://localhost:5000/api/events/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  console.log(response);
  return response;
};

const deleteEventById = async (id) => {
  console.log(id);
  const response = await axios.delete(
    `http://localhost:5000/api/events/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  console.log(response);
  return response;
};

export {
  getallEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
};
