// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toast";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { createCity, getCityData } from "../services/citiesApi";
import BackButton from "./BackButton";
import Button from "./Button";

import styles from "./Form.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

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
  const [geoCodingError, setGeoCodingError] = useState("");
  const navigate = useNavigate();
  const { isLoading, createCity } = useCities();

  useEffect(() => {
    async function fetCityData() {
      try {
        setIsLoadingGeocoding(true);
        const resp = await getCityData(lat, lng);
        if (resp.status >= 200 && resp.status < 300) {
          console.log(resp.data);
          const { city, countryCode, countryName } = resp.data;

          if (!countryCode)
            throw new Error(
              "That doesn`t seem to be like city, click somewher else"
            );
          setCityName(city);
          setCountry(countryCode);
          setEmoji(convertToEmoji(countryCode));
        }
        if (resp.err) toast.error(resp.err.message);
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    if ((lat, lng)) fetCityData();
  }, [lat, lng]);

  const handleSubmit = async function (e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date: new Date(date).toISOString(),
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate("/app");
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map." />;

  if (geoCodingError) <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
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
