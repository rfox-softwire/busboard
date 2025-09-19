import { useState } from "react";
import { getOriginsData } from "../backend/fetchOriginsData";

function TFLOrigins() {

    const initialDisplayedOriginsData = {
        year: "",
        text: "",
        imgSource: "",
        imgCaption: "",
        source: ""
    };

    const [dataLoading, setDataLoading] = useState(true); 
    const [originsData, setOriginsData] = useState([initialDisplayedOriginsData]);
    const [originsPageNumber, setOriginsPageNumber] = useState(0);
    
    const displayedOriginsData = originsData[originsPageNumber];

    if (dataLoading) {
        void (async () => {
            setOriginsData(await getOriginsData());
            setDataLoading(false);
        })();
    }    

    function previousPage() {
        setOriginsPageNumber(page => page - 1);
    }

    function nextPage() {
        setOriginsPageNumber(page => page + 1);
    }

    return (
            <section>
                <h2 className="text-xl font-bold text-cyan-600 my-2">Origins of TFL</h2>
                {dataLoading && <p>Loading - please wait</p>}
                {!dataLoading && 
                    <article className="bg-gray-100">
                        <section className="flex">
                            <h3 className="flex-1 p-2 text-xl font-bold text-gray-700">{displayedOriginsData.year}</h3>
                            <p className="flex-4 p-2">{displayedOriginsData.text}</p>
                            <figure className="flex-4 p-2">
                                {displayedOriginsData.imgSource && <img src={displayedOriginsData.imgSource} />}
                                <figcaption className="text-sm">
                                    <a className="underline hover:no-underline" href = {displayedOriginsData.imgSource}>
                                        {displayedOriginsData.imgCaption}
                                    </a>
                                </figcaption>
                            </figure>
                        </section>
                        <p className="text-xs mx-3 mb-2 text-right">Source: {displayedOriginsData.source}</p>
                        <section className="text-center">
                            {originsPageNumber > 0 && <button
                                type="button"
                                className="mb-3 mx-1 py-0.5 px-2 bg-cyan-600 hover:bg-cyan-900 rounded-lg text-white"
                                onClick={previousPage}>
                                    Previous
                                </button>}
                            {originsPageNumber < originsData.length - 1 && <button
                                type="button"
                                className="mb-3 mx-1 py-0.5 px-2 bg-cyan-600 hover:bg-cyan-900 rounded-lg text-white"
                                onClick={nextPage}>
                                    Next
                                </button>}
                        </section>
                    </article>
                }
            </section>
    );
}

export default TFLOrigins;
