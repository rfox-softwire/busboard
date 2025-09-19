import { getJourneyCountData } from "./londonDatastoreService";
import Papa from "papaparse";
import { type BusJourneysData } from "../types/BusJourneysData";

export async function getLatestNumberBusJourneys(): Promise<BusJourneysData> {
    const data = await getJourneyCountData();
    const rows = Papa.parse(data, {
            header: true,
            skipEmptyLines: true
         }).data as Record<string, string>[];
    const latestData = rows.slice(-1)[0];
    const dataPeriod = {
        fromDate: latestData["Period beginning"],
        toDate: latestData["Period ending"]
    };
    const numBusJourneys = `${latestData["Bus journeys (m)"]} million`;
    return {
        numBusJourneys,
        dataPeriod,
    };
}
