import { useState } from "react"
import { getArrivalsFromAPI } from "../backend/fetchArrivals.js"

function App() {
  const [arrivalsData, setArrivalsData] = useState("")

  async function getArrivalsData() {
    const response = await getArrivalsFromAPI()
    setArrivalsData(response)
  }

  return (
      <div>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        <button onClick = {getArrivalsData} type = "button">Get arrivals</button>
        <div>{arrivalsData}</div>
      </div>
  )
}

export default App
