import { getBusTypeData } from "./londonDatastoreService";
import Papa from "papaparse";

interface BusTypeObject {
    bus_type: string,
    drive_train_type: string,
    year: string,
    number_of_buses: string
}

function replaceUnderscoresAndCapitalise(text: string): string {
    const textReplacedUnderscores = text.split("_").join(" ");
    const stringWithCapitalisedFirst = textReplacedUnderscores.charAt(0).toUpperCase() + textReplacedUnderscores.slice(1);
    return stringWithCapitalisedFirst;
}

export async function getLatestNumberBusesByType() {
    const data = await getBusTypeData();
    const rows = Papa.parse(data, {
        header: true,
        skipEmptyLines: true
     }).data as BusTypeObject[];
    const latestElement = rows.slice(-1)[0];
    const latestYear = latestElement.year;
    const rowsWithLatestYearFiltered = rows.filter((element: BusTypeObject) => element.year === latestYear && element.number_of_buses !== "-");
    const busTypeStringArray = rowsWithLatestYearFiltered.map((element: BusTypeObject) => {
        const busType = replaceUnderscoresAndCapitalise(element.bus_type);
        const busSubType = replaceUnderscoresAndCapitalise(element.drive_train_type).replace("nrm", "New Routemaster");
        const numberBuses = Number(element.number_of_buses.split(",").join(""));
        const busCountString = numberBuses === 1 ? "1 bus" : `${numberBuses.toString()} buses`;
        return `${busType} - ${busSubType} - ${busCountString}`;
    });
    return busTypeStringArray;
}
