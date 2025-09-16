import axios from "axios";
import "@dotenvx/dotenvx/config"
import { type UnprocessedBusStopData } from "../types/UnprocessedBusStopData.ts"

const APIKEY = process.env.TFL_API_KEY ?? ""

interface DataType {
    stopPoints: UnprocessedBusStopData[]
}

export interface busData {
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

export async function getArrivalsData(stopCode: string): Promise<busData[]> {
    try {
        const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?app_key=${APIKEY}`
        const response = await axios.get<busData[]>(url)
        const data = response.data
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getStopsDataFromCoordinates(longitude: number,latitude: number): Promise<UnprocessedBusStopData[]> {
    try {
        const url = `https://api.tfl.gov.uk/StopPoint/?lat=${latitude.toString()}&lon=${longitude.toString()}&stopTypes=NaptanPublicBusCoachTram&modes=bus&app_key=${APIKEY}`
        const response = await axios.get<DataType>(url)
        const data = response.data.stopPoints
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}