import { getBusTypeData } from "./londonDatastoreService"

interface BusTypeObject {
    bus_type: string,
    drive_train_type: string,
    year: string,
    number_of_buses: string,
    [key: string]: string
}

function parseTextIntoString(text: string): string {
    const textReplacedUnderscores = text.split("_").join(" ")
    const stringWithCapitalisedFirst = textReplacedUnderscores.charAt(0).toUpperCase() + textReplacedUnderscores.slice(1)
    return stringWithCapitalisedFirst
}

export async function getLatestNumberBusesByType() {
    try {
        const data = await getBusTypeData()
        const csvSplit = data.split("\r\n")
        const headers: string[] = csvSplit[0].split(",")
        const csvData = csvSplit.slice(1-csvSplit.length)
        const busTypeDataArray = csvData.map((row: string): BusTypeObject => {
            const rowSplit = row.split(",")
            while (rowSplit.length > headers.length) {
                const finalValue = rowSplit.pop()
                if (finalValue) rowSplit[rowSplit.length-2] += finalValue.toString()
            }
            const dataObjectElement: BusTypeObject = {
                bus_type: "",
                drive_train_type: "",
                year: "",
                number_of_buses: ""
            }
            headers.forEach((cur: string, idx: number) => {
                if (cur in dataObjectElement) dataObjectElement[cur] = rowSplit[idx]
            })
            return dataObjectElement
        })
        let latestElement = busTypeDataArray.slice(-1)[0]
        while (!latestElement.year) {
            busTypeDataArray.pop()
            latestElement = busTypeDataArray.slice(-1)[0]
        }
        const latestYear = latestElement.year
        const busTypeDataArrayLatestYearFiltered = busTypeDataArray.filter((element: BusTypeObject) => element.year === latestYear && element.number_of_buses !== "-")
        const busTypeStringArray = busTypeDataArrayLatestYearFiltered.map((element: BusTypeObject) => {
            const busType = parseTextIntoString(element.bus_type)
            const busSubType = parseTextIntoString(element.drive_train_type).replace("nrm", "New Routemaster")
            const numberBusesString = element.number_of_buses.split('"').join("")
            const busCountString = numberBusesString === "1" ? "1 bus" : `${numberBusesString} buses`
            return `${busType} - ${busSubType} - ${busCountString}`
        })
        return busTypeStringArray
    } catch (error) {
        console.error(error)
        throw error
    }
}

console.log(await getLatestNumberBusesByType())