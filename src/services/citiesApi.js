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

export async function createCity(newCity) {
  try {
    const resp = await clientBaseUrl.post(
      `${clientEndPoints.getCities}`,
      newCity,
      { headers: { "Content-Type": "application/json" } }
    );

    return resp;
  } catch (err) {
    return err;
  }
}
