// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { toast } from "react-toast";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { getCityData } from "../services/citiesApi";
import BackButton from "./BackButton";
import Button from "./Button";

import styles from "./Form.module.css";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { lat, lng } = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  useEffect(() => {
    async function fetCityData() {
      setIsLoadingGeocoding(true);
      const resp = await getCityData(lat, lng);
      if (resp.status >= 200 && resp.status < 300) {
        console.log(resp.data);
        const { city, countryCode, countryName } = resp.data;
        setCityName(city);
        setCountry(countryCode);
        setEmoji(convertToEmoji(countryCode));
      }
      if (resp.err) toast.error(resp.err.message);
      setIsLoadingGeocoding(false);
    }
    if ((lat, lng)) fetCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
