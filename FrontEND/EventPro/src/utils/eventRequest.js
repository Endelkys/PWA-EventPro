import axios from './axios';

export const createEvent = (event) => {
  const res = axios.post('/events', event);
  return res;
}

export const updateEvent = (id, event) => {
  const res = axios.put(`/events/${id}`, event);
  return res;
}

export const getEventByPromotor = (id) => {
  const res = axios.get(`/events/${id}`);
  return res;
}

export const getEventsStatus = (status) => {
  const res = axios.get(`/events/status/${status}`);
  return res;
}

export const getEventsSold = () => {
  const res = axios.get(`/events/sold/`);
  return res;
}

export const deleteEvent = (id) => {
  const res = axios.delete(`/events/delete/${id}`);
  return res;
}

export const getAllEvents = () => {
  const res = axios.get(`/events`);
  return res;
}