import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts"

interface propsType {
    stopCodeList: ProcessedBusStopData[],
    onSelection: React.ChangeEventHandler<HTMLInputElement>
}

function BusStopList({ stopCodeList, onSelection }: propsType) {
    const noStopsFound: boolean = stopCodeList[0].id === null
    return (
        <section className="pt-2">
            {noStopsFound && <p className="text-red-500 pt-2">No stops found - please enter valid postcode</p>}
            {!noStopsFound && 
                <section>
                    <h3 className="font-bold">Nearest bus stops - please select:</h3>
                    <ol>
                    {stopCodeList.map((busStop: ProcessedBusStopData, index: number) => {
                        return (
                            <li key={"stop-"+index.toString()}>
                                <label>
                                    <input
                                        type="radio"
                                        name="busStops"
                                        value={busStop.id ?? undefined}
                                        onChange = {onSelection}
                                    />
                                    <p className="inline pl-1">{busStop.name}</p>
                                </label>
                            </li>
                        )
                    })
                    }
                    </ol>
                </section>
            }
        </section>
    )
}

export default BusStopList
