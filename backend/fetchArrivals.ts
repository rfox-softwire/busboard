import { parseISO, differenceInMinutes } from "date-fns";
import { getArrivalsData, type busData } from "./tflApiService.ts"

function processIncomingBusData(busData: busData[]) {
    const extractedBusData = busData.map((busData) => {
        const { lineId, destinationName, expectedArrival } = busData
        const minutesToArrival = differenceInMinutes(parseISO(expectedArrival), Date.now())
        return { lineId, destinationName, minutesToArrival }
    })
    extractedBusData.sort((a,b) => a.minutesToArrival - b.minutesToArrival)
    return extractedBusData.map((busData) => {
        const minutesToArrivalString = busData.minutesToArrival.toFixed(0)
        const displayedMinutesToArrival = minutesToArrivalString === "0" ? "Now" : `${minutesToArrivalString} minutes away`
        return `Bus #${busData.lineId} to ${busData.destinationName} - ${displayedMinutesToArrival}`
    })   
}

export async function getFirstFiveArrivals(stopCode: string): Promise<string[]> {
    try {
        const data: busData[] = await getArrivalsData(stopCode)
        const firstFiveBuses: busData[] = data.slice(0,5)
        const responseArray: string[] = processIncomingBusData(firstFiveBuses)
        return responseArray
    } catch (error) {
        console.error(error)
        throw error
    }
}