import { useContext } from "react";
import { useReducer } from "react";
import { useState, useEffect, createContext } from "react";
import {
  getCities as getCitiesApi,
  getCity as getCityApi,
  createCity as createCityApi,
  deleteCity as deleteCityApi,
} from "../services/citiesApi";

const CitiesContext = createContext();

const intialState = {
  cities: [],
  currentCity: {},
  isLoading: true,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      const cities = [...state.cities, action.payload];
      return { ...state, isLoading: false, cities };

    case "city/deleted":
      //Payload: city ID
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("Unknown Action");
  }
};

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    intialState
  );

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      const resp = await getCitiesApi();
      if (resp.status >= 200 && resp.status < 300) {
        dispatch({ type: "cities/loaded", payload: resp.data });
      }
    }
    getCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    const resp = await getCityApi(id);
    if (resp.status >= 200 && resp.status < 300) {
      dispatch({ type: "city/loaded", payload: resp.data });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const resp = await createCityApi(newCity);
      if (resp.status >= 200 && resp.status < 300) {
        dispatch({ type: "city/created", payload: resp.data });
      }
    } catch (err) {
      return err;
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    const resp = await deleteCityApi(id);
    if (resp.status >= 200 && resp.status < 300) {
      dispatch({ type: "city/deleted", payload: id });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        currentCity,
        cities,
        getCity,
        createCity,
        deleteCity,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
