import axios from './axios';

export const getPaymentRecords = () => {
  const res = axios.get('/payments')
  return res;
}

export const getPaymentRecordsUser = () => {
  const res = axios.get('/payments/users')
  return res;
}

export const createPaymentRecord = (paymentData) => {
  const res = axios.post('/payments', paymentData)
  return res;
}

export const approvePayment = (id) => {
  const res = axios.patch(`/payments/${id}`)
  return res;
}

export const deletePaymentRecord = (id) => {
  const res = axios.delete(`/payments/${id}`)
  return res;
}