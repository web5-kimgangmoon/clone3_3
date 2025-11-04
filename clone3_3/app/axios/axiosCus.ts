import axios, { Axios } from "axios";

export const axiosCus = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    Accept: "application/json",
  },
});
