import axios from "axios";
import APIKEY from "./apiKey";

const STOPCODE = "490008660N"
const URL = `https://api.tfl.gov.uk/StopPoint/${STOPCODE}/Arrivals/app_key=${APIKEY}`

export async function getArrivals() {
    try {
        const response = await axios.get(URL)
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}
