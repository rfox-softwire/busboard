import axios from "axios";
import { type CoordinateData } from "../types/CoordinateData.ts"

interface DataType {
    result: CoordinateData
}

export async function getCoordinatesFromPostCode(postCode: string): Promise<CoordinateData> {
    try {
        const url = `https://api.postcodes.io/postcodes/${postCode}`
        const response = await axios.get<DataType>(url)
        const data = response.data
        const { longitude, latitude }: CoordinateData = data.result
        return { longitude, latitude }
    } catch (error) {
        console.error(error)
        throw error
    }
}