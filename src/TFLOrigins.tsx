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
                <h2>Origins of TFL</h2>
                {dataLoading && <p>Loading - please wait</p>}
                {!dataLoading && 
                    <div>
                        <h3>{displayedOriginsData.year}</h3>
                        <p>{displayedOriginsData.text}</p>
                        <figure>
                            <img src={displayedOriginsData.imgSource} />
                            <figcaption>
                                <a href = {displayedOriginsData.imgSource}>
                                    {displayedOriginsData.imgCaption}
                                </a>
                            </figcaption>
                        </figure>
                        <p>
                            <small>
                                Source: {displayedOriginsData.source}
                            </small>
                        </p>
                        <p>
                            {originsPageNumber > 0 && <button onClick={previousPage}>Previous</button>}
                            {originsPageNumber < originsData.length - 1 && <button onClick={nextPage}>Next</button>}
                        </p>
                    </div>
                }

            </section>
    )
}

export default TFLOrigins