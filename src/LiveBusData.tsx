import { useState } from "react"
import { getNumberBusStops, getNumberBusRoutes } from "../backend/tflApiService.js"
import { getLatestNumberBusJourneys } from "../backend/fetchNumberBusJourneys.js"
import { getLatestNumberBusesByType } from "../backend/fetchNumberBusesByType.js"


function LiveBusData() {

    const [dataLoading, setDataLoading] = useState(true) 
    const [numberBusStopsString,setNumberBusStopsString] = useState("Loading")
    const [numberBusRoutesString, setNumberBusRoutesString] = useState("Loading")
    const [numberBusJourneysString, setNumberBusJourneysString] = useState("Loading")
    const [periodBusJourneysString, setPeriodBusJourneysString] = useState("loading")
    const [numberBusTypeArray, setNumberBusTypeArray] = useState(["Loading"])

    const dataNotFoundMessage = "Data not found";
    
    if (dataLoading) {
            (async () => {
                try {
                    const fetchedNumberBusStops = await getNumberBusStops()
                    setNumberBusStopsString(fetchedNumberBusStops)
                } catch (error) {
                    console.error(error)
                    setNumberBusStopsString(dataNotFoundMessage)
                    throw error
                }

                try {
                    const fetchedNumberBusRoutes = await getNumberBusRoutes()
                    setNumberBusRoutesString(fetchedNumberBusRoutes)
                } catch (error) {
                    console.error(error)
                    setNumberBusRoutesString(dataNotFoundMessage)
                    throw error
                }               

                try {
                    const fetchNumberBusJourneys = await getLatestNumberBusJourneys()
                    setNumberBusJourneysString(fetchNumberBusJourneys.numBusJourneys)
                    setPeriodBusJourneysString(fetchNumberBusJourneys.dataPeriod)
                } catch (error) {
                    console.error(error)
                    setNumberBusJourneysString(dataNotFoundMessage)
                    setPeriodBusJourneysString(dataNotFoundMessage)
                    throw error
                }

                try {
                    const fetchNumberBusTypeArray = await getLatestNumberBusesByType()
                    setNumberBusTypeArray(fetchNumberBusTypeArray)
                } catch (error) {
                    console.error(error)
                    setNumberBusTypeArray([dataNotFoundMessage])
                    throw error
                }              
                
                setDataLoading(false)
            })()
        }

    return (
        <section>
            <h2>Live bus data</h2>
            {dataLoading && <p>Loading - please wait</p>}
            {!dataLoading && <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Statistic</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Number of bus stops</td>
                        <td>{numberBusStopsString}</td>
                    </tr>
                    <tr>
                        <td>Number of bus routes</td>
                        <td>{numberBusRoutesString}</td>
                    </tr>
                    <tr>
                        <td>Number of bus journeys {periodBusJourneysString}</td>
                        <td>{numberBusJourneysString}</td>
                    </tr>
                    <tr>
                        <td>Number of buses by type</td>
                        <td>
                            <ul>
                                {numberBusTypeArray.map((busTypeString) => <li>{busTypeString}</li>)}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>}
        </section>
    )
}

export default LiveBusData