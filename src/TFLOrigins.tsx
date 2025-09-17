import { useEffect, useState } from "react"
import { getOriginsData } from "../backend/fetchOriginsData"

interface DisplayedOriginsDataType {
    year: string,
    text: string,
    imgSource: string,
    imgCaption: string,
    source: string
}

function TFLOrigins() {

    const initialDisplayedOriginsData = {
        year: "",
        text: "",
        imgSource: "",
        imgCaption: "",
        source: ""
    }

    const [dataLoading, setDataLoading] = useState(true) 
    const [originsData, setOriginsData] = useState([initialDisplayedOriginsData]);
    const [originsPageNumber, setOriginsPageNumber] = useState(0)
    const [displayedOriginsData, setDisplayedOriginsData] = useState<DisplayedOriginsDataType>(initialDisplayedOriginsData);

    if (dataLoading) {
        (async () => {
            const fetchedData = await getOriginsData()
            setOriginsData(fetchedData)
            setDataLoading(false)
        })()
    }

    useEffect(() => {
        setDisplayedOriginsData(originsData[originsPageNumber])
    }, [originsData, originsPageNumber])
    

    function previousPage() {
        setOriginsPageNumber(page => page - 1)
    }

    function nextPage() {
        setOriginsPageNumber(page => page + 1)
    }

    return (
            <section>
                <h2 className="text-xl font-bold text-cyan-600 my-2">Origins of TFL</h2>
                {dataLoading && <p>Loading - please wait</p>}
                {!dataLoading && 
                    <div className="bg-gray-100">
                        <div className="flex">
                            <h3 className="flex-1 p-2 text-xl font-bold text-gray-700">{displayedOriginsData.year}</h3>
                            <p className="flex-4 p-2">{displayedOriginsData.text}</p>
                            <figure className="flex-4 p-2">
                                <img src={displayedOriginsData.imgSource} />
                                <figcaption className="text-sm">
                                    <a className="underline hover:no-underline" href = {displayedOriginsData.imgSource}>
                                        {displayedOriginsData.imgCaption}
                                    </a>
                                </figcaption>
                            </figure>
                        </div>
                        <p className="text-xs mx-3 mb-2 text-right">Source: {displayedOriginsData.source}</p>
                        <div className="text-center">
                            {originsPageNumber > 0 && <button
                                className="mb-3 mx-1 py-0.5 px-2 bg-cyan-600 hover:bg-cyan-900 rounded-lg text-white"
                                onClick={previousPage}>
                                    Previous
                                </button>}
                            {originsPageNumber < originsData.length - 1 && <button
                                className="mb-3 mx-1 py-0.5 px-2 bg-cyan-600 hover:bg-cyan-900 rounded-lg text-white"
                                onClick={nextPage}>
                                    Next
                                </button>}
                        </div>
                    </div>
                }

            </section>
    )
}

export default TFLOrigins