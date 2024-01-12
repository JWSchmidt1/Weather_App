import "./ExploreContainer.css";
import React, { useEffect, useState } from "react";
import useGetData from "./hooks/useGetData";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const { error, loading, data, getData } = useGetData();

  //state til zip ID
  const [zip, setZip] = useState("9000");

  useEffect(() => {
    if (zip.length === 4 && !isNaN(zip)) {
      getData(
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
          zip +
          ",dk&units=metric&lang=da&appid=" +
          process.env.REACT_APP_OPENWEATHERKEY
      );
    }
  }, [zip]);

  return (
    <div id="container">
      <strong>Ready to create an app?</strong>
      <p>
        Start with Ionic{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
    </div>
  );
};

export default ExploreContainer;
