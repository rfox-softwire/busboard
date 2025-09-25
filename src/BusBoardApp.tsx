import { useEffect, useState, type ChangeEvent } from "react";
import { getFirstFiveArrivals } from "../backend/fetchArrivals.js";
import { getBusStopsNearPostCode, } from "../backend/fetchBusStops.js";
import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts";
import BusStopList from "./BusStopList.js"; 
import UpcomingBuses from "./UpcomingBuses.tsx";
import { PulseLoader } from "react-spinners";

const initialStopCodeListState = [] as ProcessedBusStopData[];

function BusBoardApp() {
  const [arrivalsData, setArrivalsData] = useState<string[]>([]);
  const [postCodeString, setPostCodeString] = useState<string>("");
  const [stopCodeString, setStopCodeString] = useState<string>("");
  const [stopName, setStopName] = useState<string>("");
  const [stopCodeList, setStopCodeList] = useState<ProcessedBusStopData[]>(initialStopCodeListState);
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)
  const [isLoadingArrivals, setIsLoadingArrivals] = useState<boolean>(false)
  const [isLoadingStops, setIsLoadingStops] = useState(false)
  const [mapCoordinates, setMapCoordinates] = useState<[number | null, number | null]>([null,null])

  async function getArrivalsData(stopCode: string) {
    try {
      setIsLoadingArrivals(true)
      const response = await getFirstFiveArrivals(stopCode);
      setArrivalsData(response);
      setIsLoadingArrivals(false)
    } catch (error) {
      setArrivalsData(["Error: No buses for stop found"]);
      setIsLoadingArrivals(false)
      throw error;
    }
  }

  async function handlePostCodeChange(postCode: string) {
    try {
      setIsLoadingStops(true)
      setPostCodeString(postCode);
      const stopArray: ProcessedBusStopData[] = await getBusStopsNearPostCode(postCode);
      setStopCodeList(stopArray);
      setIsLoadingStops(false)
    } catch (error) {
      setStopCodeList(initialStopCodeListState);
      setIsLoadingStops(false)
      throw error;
    }
  }

  function handleChangeSelectedStop(e: ChangeEvent<HTMLInputElement>) {
    setButtonClicked(false)
    setTimeRemaining(0)

    const selectedStop = e.target.value;
    if (selectedStop) {
      setStopCodeString(selectedStop);
      const stopData = stopCodeList.find((element) => element.id === selectedStop)
      const name = stopData?.name
      if (name) setStopName(name)
      const stopCoordinates = stopData?.coordinates
      if (stopCoordinates) setMapCoordinates(stopCoordinates)
    }
  }

  let timeout: ReturnType<typeof setTimeout>

  function startTimer(durationInSeconds: number) {
    setTimeRemaining(durationInSeconds)
  }

  useEffect(() => {
    if (buttonClicked) {
      timeout = setTimeout(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1)
        } else {
          (async () => {
            await getArrivalsData(stopCodeString)
          })()
          startTimer(5)
        }
      }, 1000)
    }
    return () => clearTimeout(timeout)
  }, [timeRemaining])


  async function getArrivalsButtonClicked() {    
    setButtonClicked(true)
    await getArrivalsData(stopCodeString);
    startTimer(5)
  }
    
  return (
      <main className="mx-2">
        <h1
          className="text-3xl font-bold text-center text-cyan-600 m-4">
            BusBoard
        </h1>
        
        <label>
          Enter post code:
        </label>
        <input
          className="ml-2 px-1 py-0.5 border border-cyan-600 rounded-lg"
          value = {postCodeString}
          onChange = {(e) => {
            void (async () => {
              await handlePostCodeChange(e.target.value);
            })();
          }}
        />
        
        {isLoadingStops && <PulseLoader color = "#00ACC1"/>}
        {!isLoadingStops && <BusStopList
          stopCodeList = {stopCodeList}
          onSelection = {handleChangeSelectedStop}
          mapCoordinates={mapCoordinates}
        />}

        <button
          className="my-3 py-1 px-2 bg-cyan-600 hover:bg-cyan-900 rounded-lg text-white font-bold"
          onClick = {() => {
            void (async () => {
              await getArrivalsButtonClicked()
            })();
          }}
          type = "button">Click to get arrivals
        </button>

        {arrivalsData[0] && buttonClicked && <p className="font-bold">Upcoming buses for {stopName}</p>}
        {isLoadingArrivals && <PulseLoader color = "#00ACC1"/>}
        {!isLoadingArrivals && buttonClicked && <UpcomingBuses 
          arrivalsData = {arrivalsData}
        />}
        {buttonClicked && <p className="font-bold mt-1">Bus times will refresh in {timeRemaining} seconds</p>}
      </main>
  );
}

export default BusBoardApp;
