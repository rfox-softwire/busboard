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
            void (async () => {
                try {
                    const fetchedNumberBusStops = await getNumberBusStops()
                    setNumberBusStopsString(fetchedNumberBusStops)
                } catch (error) {
                    setNumberBusStopsString(dataNotFoundMessage)
                    throw error
                }

                try {
                    const fetchedNumberBusRoutes = await getNumberBusRoutes()
                    setNumberBusRoutesString(fetchedNumberBusRoutes.toString())
                } catch (error) {
                    setNumberBusRoutesString(dataNotFoundMessage)
                    throw error
                }               

                try {
                    const fetchNumberBusJourneys = await getLatestNumberBusJourneys()
                    setNumberBusJourneysString(fetchNumberBusJourneys.numBusJourneys)
                    setPeriodBusJourneysString(fetchNumberBusJourneys.dataPeriod)
                } catch (error) {
                    setNumberBusJourneysString(dataNotFoundMessage)
                    setPeriodBusJourneysString(dataNotFoundMessage)
                    throw error
                }

                try {
                    const fetchNumberBusTypeArray = await getLatestNumberBusesByType()
                    setNumberBusTypeArray(fetchNumberBusTypeArray)
                } catch (error) {
                    setNumberBusTypeArray([dataNotFoundMessage])
                    throw error
                }              
                
                setDataLoading(false)
            })()
        }

    return (
        <section>
            <h2 className="text-xl font-bold text-cyan-600 my-2">Live London bus data</h2>
            
            {dataLoading && <p>Loading - please wait</p>}
            {!dataLoading && <table className="mw-4/5 m-1">
                <thead className="text-left border-b-2 border-gray-400">
                    <tr>
                        <th className="align-text-top p-1">Metric</th>
                        <th className="align-text-top p-1 border-l border-gray-300">Statistic</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className = "align-text-top p-1">Number of TFL bus stops</td>
                        <td className = "align-text-top p-1 border-l border-gray-300">{numberBusStopsString}</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                        <td className = "align-text-top p-1">Number of TFL bus routes</td>
                        <td className = "align-text-top p-1 border-l border-gray-300">{numberBusRoutesString}</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                        <td className = "align-text-top p-1">Number of bus journeys in London {periodBusJourneysString}</td>
                        <td className = "align-text-top p-1 border-l border-gray-300">{numberBusJourneysString}</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                        <td className = "align-text-top p-1">Number of TFL buses by type</td>
                        <td className = "align-text-top p-1 pl-5 border-l border-gray-300">
                            <ul className="list-disc">
                                {numberBusTypeArray.map((busTypeString,index) => <li key = {"type-"+index.toString()}>{busTypeString}</li>)}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>}
        </section>
    )
}

export default LiveBusData