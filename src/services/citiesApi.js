import axios from "axios";
import {
  clientBaseUrl,
  clientEndPoints,
  clientGeoCodingBaseUrl,
} from "./config";

export async function getCities() {
  try {
    const resp = await clientBaseUrl.get(clientEndPoints.getCities);
    return resp;
  } catch (error) {
    return error;
  }
}

export async function getCity(id) {
  try {
    const resp = await clientBaseUrl.get(`${clientEndPoints.getCities}/${id}`);
    return resp;
  } catch (err) {
    return err;
  }
}

export async function getCityData(lat, lng) {
  console.log("LATLNG", lat, lng);
  try {
    const resp = await clientGeoCodingBaseUrl.get(
      `${clientEndPoints.getGeoCoding}?latitude=${lat}&longitude=${lng}}`
    );
    return resp;
  } catch (error) {
    return { err: error.message || "" };
    console.log(error);
  }
}
