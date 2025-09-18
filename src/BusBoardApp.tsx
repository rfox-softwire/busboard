import { useState, type ChangeEvent } from "react"
import { getFirstFiveArrivals } from "../backend/fetchArrivals.js"
import { getBusStopsNearPostCode, } from "../backend/fetchBusStops.js"
import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts"
import BusStopList from "./BusStopList.js" 

const initialStopCodeListState = [{
    id: null,
    name: "No stops found - please enter valid postcode"
  }] as ProcessedBusStopData[]

function BusBoardApp() {
  const [arrivalsData, setArrivalsData] = useState<string[]>([""])
  const [postCodeString, setPostCodeString] = useState<string>("")
  const [stopCodeString, setStopCodeString] = useState<string>("")
  const [stopCodeList, setStopCodeList] = useState<ProcessedBusStopData[]>(initialStopCodeListState)

  async function getArrivalsData(stopCode: string) {
    try {
      const response = await getFirstFiveArrivals(stopCode)
      setArrivalsData(response)
    } catch (error) {
      setArrivalsData(["Error: No buses for stop found"])
      throw error
    }
  }

  async function handlePostCodeChange(postCode: string) {
    try {
      setPostCodeString(postCode)
      const stopArray: ProcessedBusStopData[] = await getBusStopsNearPostCode(postCode)
      setStopCodeList(stopArray)
    } catch (error) {
      setStopCodeList(initialStopCodeListState)
      throw error
    }
  }

  function handleChangeSelectedStop(e: ChangeEvent<HTMLInputElement>) {
    const selectedStop = e.target.value
    if (selectedStop) {
      setStopCodeString(selectedStop)
    }
  }
  
  return (
      <body className="mx-2">
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
              await handlePostCodeChange(e.target.value)
            })()
          }}
        />
        
        <BusStopList
          stopCodeList = {stopCodeList}
          onSelection = {handleChangeSelectedStop}
        />

        <button
          className="my-3 py-1 px-2 bg-cyan-600 hover:bg-cyan-900 rounded-lg text-white font-bold"
          onClick = {() => {
            void (async () => {
              await getArrivalsData(stopCodeString)
            })()
          }}
          type = "button">Click to get arrivals
        </button>
        
        {arrivalsData[0] && <p className="font-bold">Upcoming buses</p>}
        <ol className="list-decimal ml-5">
          {arrivalsData.map((busData, index) => {
            if (busData) return <li key = {"bus-"+index.toString()}>
              {busData}
            </li>
          })}
        </ol>
      </body>
  )
}

export default BusBoardApp
