import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts"

interface propsType {
    stopCodeList: ProcessedBusStopData[],
    onSelection: React.ChangeEventHandler<HTMLInputElement>
}

function BusStopList({ stopCodeList, onSelection }: propsType) {
    const noStopsFound: boolean = stopCodeList[0].id === null
    return (
        <div>
            {noStopsFound && <p>No stops found - please enter valid postcode</p>}
            {!noStopsFound &&
                <div>
                    <p>Nearest bus stops - please select:</p>
                    {stopCodeList.map((busStop: ProcessedBusStopData, index: number) => {
                        return (
                            <div key={"stop-"+index.toString()}>
                                <label>
                                    <input
                                        type="radio"
                                        name="busStops"
                                        value={busStop.id ?? undefined}
                                        onChange = {onSelection}
                                    />
                                    {busStop.name}
                                </label>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div>
    )
}

export default BusStopList
