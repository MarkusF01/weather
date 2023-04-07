import { useEffect, useRef } from "react";
import { CityData } from "../App";
import SingleCard from "./SingleCard";

type Props =
  {
    weatherDataArray: CityData[];
    handleClickRemove: (name: string) => void;
  };


const WeatherCard: React.FC<Props> = (props) => {
  return (
    <div className="weather-card-wrapper">
      {props.weatherDataArray.map((element) => (
        <SingleCard city={element} handleClickRemove={props.handleClickRemove} />
      ))}
    </div>
  );
};

export default WeatherCard;
