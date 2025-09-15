import { useState } from "react"
import { getArrivalsFromAPI } from "../backend/fetchArrivals.js"
import { getBusStopsNearPostCode, type processedBusStopData } from "../backend/fetchBusStops.js"
import BusStopList from "./BusStopList.js" 

function App() {
  const [arrivalsData, setArrivalsData] = useState([""])
  const [postCodeData, setPostCodeData] = useState("")
  const [stopCodeData, setStopCodeData] = useState("")
  const [stopCodeList, setStopCodeList] = useState([{
    id: "",
    name: "No stops found - please enter valid postcode"
  }])

  async function getArrivalsData(stopCode: string) {
    const response = await getArrivalsFromAPI(stopCode)
    setArrivalsData(response)
  }

  async function postCodeChange(postCode: string) {
    setPostCodeData(postCode)
    const stopArray: processedBusStopData[] = await getBusStopsNearPostCode(postCode) as processedBusStopData[]
    setStopCodeList(stopArray)
  }

  function handleChangeSelectedStop(e: Event) {
    const selectedStop = e.target.value
    if (selectedStop) {
      setStopCodeData(selectedStop)
    }
  }
  
  return (
      <div>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        
        <label>
          Enter post code:
          <br/>
          <input
            value = {postCodeData}
            onChange = {e => postCodeChange(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        
        <BusStopList
          stopCodeList = {stopCodeList}
          onSelection = {handleChangeSelectedStop}
        />
        <br/>
               
        <button
          onClick = {() => getArrivalsData(stopCodeData)}
          type = "button">Click to get arrivals
        </button>
        <br/>
        <br/>

        <ol>
          {arrivalsData.map((busData, index) => {
            return <li key = {"bus-"+index}>{busData}</li>
          })}
        </ol>
      </div>
  )
}

export default App
