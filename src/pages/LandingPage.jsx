import React, { useState, useEffect } from "react";
import * as data from '../assets/json/weather.json'
import './LandingPage.scss'

import { locationOutline } from "ionicons/icons";
import { IonPage, IonIcon } from "@ionic/react";

const LandingPage = () => {
    const [ openIndex, setOpenIndex ] = useState( null );

    useEffect( () => {
        const today = new Date().getDay();
        const adjustedIndex = today === 0 ? 6 : today - 1;
        setOpenIndex( adjustedIndex );
    }, [] );

    const toggleWeatherStats = ( index ) => {
        if ( openIndex === index ) {

            return;
        }
        setOpenIndex( index );
    }

    return (
        <>
            <IonPage>
                <div className="container">
                    <div>
                        <div className="weatherLoc">
                            <p><IonIcon icon={ locationOutline } /> Århus, Danmark</p>
                        </div>
                        { data && (
                            <div>
                                <div className="buttonsCon">
                                    { data.daily.slice( 0, 7 ).map( ( myData, index ) => (
                                        <>
                                            <div className="showStatsCon" style={ { gridColumn: index + 1 } }>
                                                <button className={ `showWeatherStats ${ openIndex === index ? 'active' : '' }` } onClick={ () => toggleWeatherStats( index ) }>
                                                    { new Date( myData.dt * 1000 ).toLocaleString( "da-DK", { weekday: "short" } ).toUpperCase().slice( 0, -1 ) }
                                                </button>
                                            </div>
                                        </>
                                    ) ) }
                                </div>
                                <div className="weatherCon">
                                    { data.daily.slice( 0, 7 ).map( ( myData, index ) => (
                                        <>
                                            <div className={ `weatherStatsCon ${ openIndex === index ? 'weatherStatsShow' : '' }` } style={ { display: openIndex === index ? 'flex' : 'none' } }>
                                                <p className="weatherImg">
                                                    <img
                                                        src={
                                                            myData.clouds > 50
                                                                ? "src/assets/images/cloudy.png"
                                                                : myData.clouds > 25
                                                                    ? "src/assets/images/sunny.png"
                                                                    : "src/assets/images/sun.png"
                                                        }
                                                        alt="weatherCondition"
                                                    />
                                                </p>
                                                <div className="weatherTempCon">
                                                    <p className="weatherTemp">{ Math.round( myData.temp.max ) }°</p>
                                                    <p className="weatherCondition">
                                                        { myData.clouds > 50
                                                            ? "Overskyet"
                                                            : myData.clouds > 25
                                                                ? "Delvist sol"
                                                                : "Solrigt" }
                                                    </p>
                                                </div>
                                                <div className="weatherStatsPlusCon">
                                                    <div className="weatherDetails">
                                                        <p className="weatherData">{ myData.pressure } hPa</p>
                                                        <p>Lufttryk</p>
                                                    </div>
                                                    <div className="weatherDetails">
                                                        <p className="weatherData">{ myData.wind_speed } m/s</p>
                                                        <p>Vind</p>
                                                    </div>
                                                    <div className="weatherDetails">
                                                        <p className="weatherData">{ myData.humidity } %</p>
                                                        <p>Luftfugtighed</p>
                                                    </div>
                                                    {/* <div className="weatherDetails">
                                                        { myData.rain ? (
                                                            <>
                                                                <p className="weatherData">{ myData.rain } mm</p>
                                                                <p>Nedbør</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="weatherData">0 mm</p>
                                                                <p>Nedbør</p>
                                                            </>
                                                        ) }
                                                    </div> */}
                                                    <div className="weatherDetails">
                                                        <p className="weatherData">{ Math.round(myData.temp.morn) }°</p>
                                                        <p>Morgen</p>
                                                    </div>
                                                    <div className="weatherDetails">
                                                        <p className="weatherData">{ Math.round(myData.temp.day) }°</p>
                                                        <p>Middag</p>
                                                    </div>
                                                    <div className="weatherDetails">
                                                        <p className="weatherData">{ Math.round(myData.temp.eve) }°</p>
                                                        <p>Aften</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) ) }
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
            </IonPage>
        </>
    );
}

export default LandingPage;
