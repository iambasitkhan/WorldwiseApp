import axios from "axios";

const BASE_URL = "http://localhost:8000";
const reverseGeoCodingBaseUrl = "https://api.bigdatacloud.net";

const clientBaseUrl = axios.create({ baseURL: BASE_URL });
const clientGeoCodingBaseUrl = axios.create({
  baseURL: reverseGeoCodingBaseUrl,
});

const clientEndPoints = {
  getCities: "/cities",
  getGeoCoding: "/data/reverse-geocode-client",
};

export { clientBaseUrl, clientGeoCodingBaseUrl, clientEndPoints };
