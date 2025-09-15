import axios from "axios";
import APIKEY from "./apiKey";
import { parseISO, differenceInMinutes } from "date-fns";

type busData = {
    id: string,
    operationType: number,
    vehicleId: string,
    naptanId: string,
    stationName: string,
    lineId: string,
    lineName: string,
    platformName: string,
    direction: string,
    bearing: string,
    destinationNaptanId: string,
    destinationName: string,
    timestamp: string,
    timeToStation: number,
    currentLocation: string,
    towards: string,
    expectedArrival: string,
    timeToLive: string,
    modeName: string,
    timing: {
        countdownServerAdjustment: string,
        source: string,
        insert: string,
        read: string,
        sent: string,
        received: string
    }
}

function processBusData(busData: busData[]) {
    const extractedBusData = busData.map((busData) => {
        const { lineId, destinationName, expectedArrival } = busData
        const minutesToArrival = differenceInMinutes(parseISO(expectedArrival), Date.now())
        return {lineId, destinationName, minutesToArrival}
    })
    extractedBusData.sort((a,b) => a.minutesToArrival - b.minutesToArrival)
    return extractedBusData.map((busData) => {
        const minutesToArrivalString = busData.minutesToArrival.toFixed(0)
        const displayedMinutesToArrival = minutesToArrivalString === "0" ? "Now" : `${minutesToArrivalString} minutes`
        return `Bus #${busData.lineId} to ${busData.destinationName} - ${displayedMinutesToArrival}`
    })   
}

export async function getArrivalsFromAPI(stopCode: string) {
    try {
        const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?app_key=${APIKEY}`
        const response = await axios.get(url)
        const data = response.data.slice(0,5)
        const responseArray: string[] = processBusData(data)
        return responseArray
    } catch (error) {
        console.error(error)
        const errorResponse: string[] = ["Stop code not found"]
        return errorResponse
    }
}