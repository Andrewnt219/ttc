import Appbar from "@src/components/Appbar";
import { useTtcXml } from "@src/lib/ttc";
import { useToggleDarkMode } from "@src/utils/hooks/useToggleDarkMode.hook";
import { ErrorResponse } from "api";
import  { AxiosError } from "axios";
import { ReactNode, useEffect } from "react";
import tw, { styled } from "twin.macro";

export default function Home(): ReactNode {
  const [, toggleDarkMode] = useToggleDarkMode();
  const {getVehicleLocation, getPredictionsForMultiStops, getRouteListXml, getPredictions, getRouteConfigXml, getSchedule, getVehicleLocations } = useTtcXml();

  // TODO: try to return the actual merror message from nextbus instead of made up one
  useEffect(() => {
    getVehicleLocation("3463").then(res => console.log(res.data)).catch(error => console.log((error as AxiosError<ErrorResponse>).response?.data.message));
    
    // const callback = getVehicleLocations(new Date().getTime().toString(), "60");
    // setTimeout(() => {
    //   callback().then(res => console.log(res.data)).catch(error => console.log((error as AxiosError<ErrorResponse>).response?.data.message));
    // }, 15000);
    
    // getPredictionsForMultiStops([["39", "14211"], ["60", "3041"]]).then(res => console.log(res.data)).catch(error => console.log((error as AxiosError<ErrorResponse>).response?.data.message));
    // getSchedule("39").then(res => console.log(res.data)).catch(error => console.log((error as AxiosError<ErrorResponse>).response?.data.message))
    // getPredictions({stopId: "39"}).then(res => console.log(res.data));
    // getRouteListXml()
    //   .then((res) => console.log(res.data))
    //   .catch((error) =>
    //     console.log((error as AxiosError<ErrorResponse>).response?.data.message)
    //   );
    // getRouteConfigXml("60")
    //   .then((res) => console.log(res.data))
    //   .catch((error) =>
    //     console.log((error as AxiosError<ErrorResponse>).response?.data.message)
    //   );
  }, [getPredictionsForMultiStops, getRouteListXml, getPredictions, getRouteConfigXml, getSchedule, getVehicleLocations]);

  return (
    <Div>
      <Appbar />
      I came across the webdev subreddit, which was full of amazing things
      people could do on the web. Out of curiosity, I learned HTML and CSS, but
      quickly moved on after boxes refused to be centered.
      <br />
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </Div>
  );
}

const Div = styled.div`
  ${tw`bg-primary`}
`;
