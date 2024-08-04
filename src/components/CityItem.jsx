import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

import { formatDate } from "../utils/helper";
import styles from "./CityItem.module.css";

export default function CityItem({ city }) {
  const {
    id,
    emoji,
    cityName,
    date,
    position: { lat, lng },
  } = city;

  const { currentCity } = useCities();
  return (
    <li>
      <Link
        to={`${city.id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
