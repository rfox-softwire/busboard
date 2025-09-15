import { useState } from "react"
import { getArrivalsFromAPI } from "../backend/fetchArrivals.js"

function App() {
  const [arrivalsData, setArrivalsData] = useState([""])
  const [stopCodeData, setStopCodeData] = useState("490008660N")

  async function getArrivalsData(stopCode: string) {
    const response = await getArrivalsFromAPI(stopCode)
    setArrivalsData(response)
  }

  return (
      <div>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        <label>
          Enter bus stop code:<br/>
          <input
            value = {stopCodeData}
            onChange = {e => setStopCodeData(e.target.value)}
          />
        </label>
        <br/>
        <br/>
        <button onClick = {() => getArrivalsData(stopCodeData)} type = "button">Get arrivals</button>
        <ol>
          {arrivalsData.map((busData, index) => {
            return <li key = {index}>{busData}</li>
          })}
        </ol>
      </div>
  )
}

export default App
