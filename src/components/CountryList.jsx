import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((countries, city) => {
    if (!countries.map((counrty) => counrty.country).includes(city.country)) {
      return [
        ...countries,
        { id: city.id, emoji: city.emoji, country: city.country },
      ];
    } else return countries;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </div>
  );
}
