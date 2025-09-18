import "@dotenvx/dotenvx/config"
import { getCoordinatesFromPostCode } from "./postCodeService.js"
import { getStopsDataFromCoordinates } from "./tflApiService.ts"
import { type CoordinateData } from "../types/CoordinateData.ts"
import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts"
import { type UnprocessedBusStopData } from "../types/UnprocessedBusStopData.ts"



export async function getBusStopsNearPostCode(postCode: string): Promise<ProcessedBusStopData[]> {
    const { longitude, latitude }: CoordinateData = await getCoordinatesFromPostCode(postCode)
    const data = await getStopsDataFromCoordinates(longitude,latitude)
    const nearestTwoStops = data.slice(0,2)
    const busStopArray = nearestTwoStops.map((busStop: UnprocessedBusStopData) => {
        const { naptanId, commonName } = busStop
        return {
            id: naptanId,
            name: commonName
        }
    })
    return busStopArray
}