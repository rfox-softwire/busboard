import axios from "axios";
import APIKEY from "./apiKey";

const STOPCODE = "490008660N"
const URL = `https://api.tfl.gov.uk/StopPoint/${STOPCODE}/Arrivals?app_key=${APIKEY}`

getArrivalsFromAPI()

export async function getArrivalsFromAPI() {
    try {
        const response = await axios.get(URL)
        console.log(response)
        const responseText = await JSON.stringify(response)
        return responseText
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(error.config)
            const axiosErrorText = await JSON.stringify(error)
            return axiosErrorText
        }
        return "error"
    }
}
