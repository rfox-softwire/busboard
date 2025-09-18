import axios from "axios";
import { type CoordinateData } from "../types/CoordinateData.ts"

export async function getCoordinatesFromPostCode(postCode: string): Promise<CoordinateData> {
    const url = `https://api.postcodes.io/postcodes/${postCode}`
    const response = await axios.get<{result: CoordinateData}>(url)
    const data = response.data
    const { longitude, latitude }: CoordinateData = data.result
    return { longitude, latitude }
}