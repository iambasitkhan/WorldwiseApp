import { useState } from "react";

export function useGeoLocation(defaultLocation = null) {
  const [position, setPosition] = useState(defaultLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser doesnot support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setPosition({ lat, lng });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, isLoading, error, getPosition };
}
