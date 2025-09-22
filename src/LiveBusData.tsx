import { useState } from "react";
import { getNumberBusStops, getNumberBusRoutes } from "../backend/tflApiService.js";
import { getLatestNumberBusJourneys } from "../backend/fetchNumberBusJourneys.js";
import { getLatestNumberBusesByType } from "../backend/fetchNumberBusesByType.js";
import type { BusJourneysData } from "../types/BusJourneysData.js";
import { PulseLoader } from "react-spinners";


function LiveBusData() {

    const dataNotFoundMessage = "Data not found";

    const [dataLoading, setDataLoading] = useState(true); 
    const [numberOfBusStops,setNumberOfBusStops] = useState<number | string>(dataNotFoundMessage);
    const [numberOfBusRoutes, setNumberOfBusRoutes] = useState<number| string>(dataNotFoundMessage);
    const [busJourneysData, setBusJourneysData] = useState<BusJourneysData>({
        numBusJourneys: dataNotFoundMessage,
        dataPeriod: { fromDate: null, toDate: null }
    });
    const [numberOfBusesByType, setNumberOfBusesByType] = useState<string[]>([dataNotFoundMessage]);
    
    if (dataLoading) {
            void (async () => {
                await Promise.allSettled([
                    await getNumberBusStops(),
                    await getNumberBusRoutes(),
                    await getLatestNumberBusJourneys(),
                    await getLatestNumberBusesByType()
                ]).then((results) => {
                    if (results[0].status === "fulfilled") {
                        setNumberOfBusStops(results[0].value);
                    } else {
                        throw results[0].reason;
                    }

                    if (results[1].status === "fulfilled") {
                        setNumberOfBusRoutes(results[1].value);
                    } else {
                        throw results[1].reason;
                    }

                    if (results[2].status === "fulfilled") {
                        setBusJourneysData(results[2].value);
                    } else {
                        throw results[2].reason;
                    }

                    if (results[3].status === "fulfilled") {
                        setNumberOfBusesByType(results[3].value);
                    } else {
                        throw results[3].reason;
                    }
                }).then(() => {
                    setDataLoading(false);
                });
            })();
        }

    const { fromDate, toDate } = busJourneysData.dataPeriod;
    const periodOfBusJourneys = (fromDate && toDate) ? `from ${fromDate} to ${toDate}`: "";

    return (
        <section>
            <h2 className="text-xl font-bold text-cyan-600 my-2">Live London bus data</h2>
            
            {dataLoading && <PulseLoader color = "#00ACC1"/>}
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
                        <td className = "align-text-top p-1 border-l border-gray-300">{numberOfBusStops}</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                        <td className = "align-text-top p-1">Number of TFL bus routes</td>
                        <td className = "align-text-top p-1 border-l border-gray-300">{numberOfBusRoutes}</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                        <td className = "align-text-top p-1">Number of bus journeys in London {periodOfBusJourneys}</td>
                        <td className = "align-text-top p-1 border-l border-gray-300">{busJourneysData.numBusJourneys}</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                        <td className = "align-text-top p-1">Number of TFL buses by type</td>
                        <td className = "align-text-top p-1 pl-5 border-l border-gray-300">
                            <ul className="list-disc">
                                {numberOfBusesByType.map((busTypeString,index) => <li key = {"type-"+index.toString()}>{busTypeString}</li>)}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>}
        </section>
    );
}

export default LiveBusData;
