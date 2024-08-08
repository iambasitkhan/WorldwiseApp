import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { getCity as getCityApi } from "../services/citiesApi";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// // TEMP DATA
// const currentCity = {
//   cityName: "Lisbon",
//   emoji: "🇵🇹",
//   date: "2027-10-31T15:59:59.138Z",
//   notes: "My favorite city so far!",
// };

const BASE_URL = "http://localhost:8000";

function City() {
  const { id } = useParams();
  const { isLoading, getCity, currentCity } = useCities();

  const { cityName, emoji, date, notes, id: currentCityId } = currentCity;

  useEffect(function () {
    async function getCityData() {
      await getCity(id);
    }

    if (id === currentCityId) return;
    getCityData();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
