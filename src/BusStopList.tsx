import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts";

interface propsType {
    stopCodeList: ProcessedBusStopData[],
    onSelection: React.ChangeEventHandler<HTMLInputElement>
}

function BusStopList({ stopCodeList, onSelection }: propsType) {
    const noStopsFound: boolean = stopCodeList.length === 0;
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
                                <label className="inline">
                                    <input
                                        type="radio"
                                        name="busStops"
                                        className="mx-1"
                                        value={busStop.id ?? undefined}
                                        onChange = {onSelection}
                                    />
                                    {busStop.name}
                                </label>
                            </li>
                        );
                    })
                    }
                    </ol>
                </section>
            }
        </section>
    );
}

export default BusStopList;
