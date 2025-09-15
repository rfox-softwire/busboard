import axios from "axios";

export async function getCoordsFromPostCode(postCode: string) {
    try {
        const url = `https://api.postcodes.io/postcodes/${postCode}`
        const response = await axios.get(url)
        const data = response.data
        const {longitude, latitude} = data.result
        return {longitude, latitude}
    } catch (error) {
        return {longitude: null, latitude: null}
    }
}