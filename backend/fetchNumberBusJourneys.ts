import { getJourneyCountData } from "./londonDatastoreService"

type BusJourneysObject = Record<string, string>;

export async function getLatestNumberBusJourneys() {
    const data = await getJourneyCountData()
    const csvSplit = data.split("\r\n")
    const headers: string[] = csvSplit[0].split(",")
    let latestData = csvSplit.pop()
    while (!latestData) {
        latestData = csvSplit.pop()
    }
    const latestDataSplit = latestData.split(",")
    const latestDataObject: BusJourneysObject = {}
    headers.forEach((cur: string, idx: number) => {
        latestDataObject[cur] = latestDataSplit[idx]
    })
    const dataPeriod = `from ${latestDataObject["Period beginning"]} to ${latestDataObject["Period ending"]}`
    const numBusJourneys = `${latestDataObject["Bus journeys (m)"]} million`
    return {
        dataPeriod,
        numBusJourneys
    }
}