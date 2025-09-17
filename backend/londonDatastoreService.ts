import axios from "axios";

export async function getJourneyCountData() {
    try {
        const url = `https://data.london.gov.uk/download/edfd8c31-0ac6-4a1e-9ccd-2660161ebdce/06a805f6-77c6-481a-8b08-ddef56afffdd/tfl-journeys-type.csv`
        const response = await axios.get(url)
        const data = response.data
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getBusTypeData() {
    try {
        const url = `https://data.london.gov.uk/download/a5a5d79c-dd40-4a98-9b11-1e726f8fa54a/ff855b47-3faa-48de-87c7-18c1165b5945/tfl%20buses%20type.csv`
        const response = await axios.get(url)
        const data = response.data
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}