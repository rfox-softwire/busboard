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
                <div>
                    <p className="font-bold">Nearest bus stops - please select:</p>
                    <ol>
                    {stopCodeList.map((busStop: ProcessedBusStopData, index: number) => {
                        return (
                            <li>
                                <label key={"stop-"+index.toString()}>
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
                </div>
            }
        </section>
    )
}

export default BusStopList
