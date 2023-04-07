import { CityData } from "../App"


type Props = {
    city: CityData;
    handleClickRemove: (cityName: string) => void;
}

const SingleCard: React.FC<Props> = (props) => {
    const city = props.city;
    return (
        <div key={city.name} className="card">
            <div id="card-top-wrapper">

                <div id="city-name">
                    <h1>{city.name}&nbsp;</h1>
                    <h5>{city.countryCode}</h5>
                    {/* <div id="card-icon" className="material-icons">thunderstorm</div> */}
                </div>

                <div id="remove-btn-wrapper">
                    <button id="remove-btn" className="material-icons" onClick={() => props.handleClickRemove(city.name)}>
                        clear
                    </button>
                </div>
            </div>

            <div id="card-temperature">{Math.round(city.temp)} °C</div>

            <div id="card-weather-condition">{city.cloudDescription}</div>

            <div id="card-inner-wrapper">
                <div>Feels like: {Math.round(city.feelsLike)} °C</div>
                <div>Wind: {Math.round(city.windSpeed)} km/h</div>
            </div>
        </div>
    )
}

export default SingleCard;