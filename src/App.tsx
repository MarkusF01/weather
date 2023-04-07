import { useState, useEffect, useContext, createContext, useRef } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";



export interface CityData {
  name: string;
  temp: number;
  feelsLike: number;
  countryCode: string;
  cloudDescription: string;
  windSpeed: number;
}

export interface InputObject {
  inputValue: string;
  inputType: string;
  inputPlaceholder: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBtnClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputProps: InputObject = {
  inputValue: "",
  inputType: "",
  inputPlaceholder: "",
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => null,
  onBtnClick: () => null,
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => null,
};

export const InputContext = createContext(InputProps);



function App() {
  const [inputValue, setInputValue] = useState("");
  const [weatherDataArray, setWeatherDataArray] = useState<CityData[]>([]);
  const API_KEY = "ef6e090d0fed450ba07f747031ada8e4";

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      startCall();
    }
  }

  const handleBtnClick = () => {
    startCall();
  };

  const startCall = async () => {
    if(weatherDataArray.length < 5) {
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API_KEY}`;
      const weatherData = await (await fetch(endpoint)).json();
      const cityObject = createCityObject(weatherData);

      if (!checkForExistence(cityObject.name)) {
        addNewCityObject(cityObject);
      } else {
        alert("Card already exists.");
      }      
    } else {
      alert("You can't add more then 5 cities")
    }

  };

  const addNewCityObject = (cityObject: CityData) => {
    setWeatherDataArray((prevWeatherDataArray) => [
      ...prevWeatherDataArray,
      cityObject,
    ]);
  };

  const checkForExistence = (cityName: string) => {
    for (let i = 0; i < weatherDataArray.length; i++) {
      if (weatherDataArray[i].name == cityName) {
        return true;
      }
    }
  };

  useEffect(() => {
    // console.log(weatherDataArray);
    setInputValue("");
  }, [JSON.stringify(weatherDataArray)]);

  const createCityObject = (weatherData: any) => {
    const cityObject: CityData = {
      name: weatherData.name,
      temp: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      countryCode: weatherData.sys.country,
      cloudDescription: weatherData.weather[0].description,
      windSpeed: weatherData.wind.speed
    };

    return cityObject;
  };

  const InputProps: InputObject = {
    inputValue: inputValue,
    inputType: "text",
    inputPlaceholder: "Enter a city",
    onChangeHandler: onChangeHandler,
    onBtnClick: handleBtnClick,
    onKeyDown: handleKeyDown,
  };

  const handleClickRemove = (name: string) => {
    const newArray = [...weatherDataArray];
    for (let i = 0; i < weatherDataArray.length; i++) {
      if (weatherDataArray[i].name == name) {
        newArray.splice(i, 1);
        setWeatherDataArray(newArray);
        break;
      }
    }
  };



  return (
    <div className="App">
      <header className={weatherDataArray.length == 0 ? "down-header" : "normal-header"}>Weather</header>
      <main>
        {
        weatherDataArray.length == 0 ? 
        <div id="description">My weather app allows users to search for the weather conditions in any city. Users can receive a card with current temperature, weather condition, and windspeed. The app allows users to search for multiple cities to get separate cards for each location.</div>
        : null
        }
        <InputContext.Provider value={InputProps}>
          <SearchBar />
        </InputContext.Provider>

        <WeatherCard
          weatherDataArray={weatherDataArray}
          handleClickRemove={handleClickRemove}
        />
      </main>
      <footer>© 2023 Copyright - Markus Fehringer </footer>
    </div>
  );
}

export default App;
