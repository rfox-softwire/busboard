import { useEffect } from "react";
import { type ProcessedBusStopData } from "../types/ProcessedBusStopData.ts";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker
} from 'react-leaflet';

interface propsType {
    stopCodeList: ProcessedBusStopData[],
    onSelection: React.ChangeEventHandler<HTMLInputElement>
    mapCoordinates: [number | null , number | null]
}

function BusStopList({ stopCodeList, onSelection, mapCoordinates }: propsType) {
    const noStopsFound: boolean = stopCodeList.length === 0;

    const RecentreAutomatically = ({ coordinates } : {coordinates: [number,number]}) => {
        const map = useMap();
        useEffect(() => {
            map.setView(coordinates);
        }, [coordinates]);
        return null;
    };

    return (
        <section className="pt-2">
            {noStopsFound && <p className="text-red-500 pt-2">No stops found - please enter valid postcode</p>}
            {!noStopsFound &&
                <section className="flex"> 
                    <section className="flex-1">
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
                    {mapCoordinates[0] !== null && mapCoordinates[1] !== null && <MapContainer center={mapCoordinates as [number,number]} zoom={20} scrollWheelZoom={false} className="h-100 flex-1">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapCoordinates as [number,number]}></Marker>
                        <RecentreAutomatically coordinates = {mapCoordinates as [number, number]}/>
                    </MapContainer>}
                </section>
            }
        </section>
    );
}

export default BusStopList;
