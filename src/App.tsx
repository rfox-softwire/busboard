import { useState, type ChangeEvent } from "react"
import { getFirstFiveArrivals } from "../backend/fetchArrivals.js"
import { getBusStopsNearPostCode, } from "../backend/fetchBusStops.js"
import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts"
import BusStopList from "./BusStopList.js" 

const initialStopCodeListState = [{
    id: null,
    name: "No stops found - please enter valid postcode"
  }] as ProcessedBusStopData[]

function App() {
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
      <div>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        
        <label>
          Enter post code:
        </label>
        <br/>
        <input
          value = {postCodeString}
          onChange = {(e) => {
            void (async () => {
              await handlePostCodeChange(e.target.value)
            })()
          }}
        />
        
        <br/>
        <br/>
        
        <BusStopList
          stopCodeList = {stopCodeList}
          onSelection = {handleChangeSelectedStop}
        />
        <br/>
               
        <button
          onClick = {() => {
            void (async () => {
              await getArrivalsData(stopCodeString)
            })()
          }}
          type = "button">Click to get arrivals
        </button>
        <br/>
        <br/>

        <ol>
          {arrivalsData.map((busData, index) => {
            return <li key = {"bus-"+index.toString()}>{busData}</li>
          })}
        </ol>
      </div>
  )
}

export default App
