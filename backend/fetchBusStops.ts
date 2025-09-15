import axios, { type AxiosResponse } from "axios";
import APIKEY from "./apiKey";
import { getCoordsFromPostCode } from "../backend/fetchCoordinates.js"

export interface processedBusStopData {
    id: string,
    name: string
}

interface coordinateData {
    latitude: number,
    longitude: number
}

export async function getBusStopsNearPostCode(postCode: string) {
    try {
        const coordinateData: coordinateData = await getCoordsFromPostCode(postCode)
        const url = `https://api.tfl.gov.uk/StopPoint/?lat=${coordinateData.latitude}&lon=${coordinateData.longitude}&stopTypes=NaptanPublicBusCoachTram&modes=bus&app_key=${APIKEY}`
        const response: AxiosResponse = await axios.get(url)
        const data = response.data.stopPoints.slice(0,2)
        const busStopArray = data.map((busStop: any) => {
            const { naptanId, commonName } = busStop
            return {
                id: naptanId,
                name: commonName
            }
        })
        return busStopArray
    } catch (error) {
        const errorResponse: processedBusStopData[] = [{
            id: "",
            name: "No stops found - please enter valid postcode"
        }]
        return errorResponse
    }
}