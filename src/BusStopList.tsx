import {type processedBusStopData } from "../backend/fetchBusStops.js"

interface propsType {
    stopCodeList: processedBusStopData[],
    onSelection: any
}

function BusStopList({stopCodeList, onSelection}: propsType) {
    if (stopCodeList[0].id === "") {
        return (
            <p>No stops found - please enter valid postcode</p>
        )
    }
    return (
    <div>
        <p>Nearest bus stops - please select:</p>
        {stopCodeList.map((busStop: processedBusStopData, index: number) => {
            return (
                <div key={"stop-"+index}>
                    <label>
                        <input
                            type="radio"
                            name="busStops"
                            value={busStop.id}
                            onChange = {onSelection}
                        />
                        {busStop.name}
                    </label>
                </div>
            )
        })
        }
    </div>
    )
}

export default BusStopList
