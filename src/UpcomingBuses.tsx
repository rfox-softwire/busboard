function UpcomingBuses({arrivalsData, timeRemaining}: {arrivalsData: string[], timeRemaining: number}) {
    return (
        <section>
            <ol className="list-decimal ml-5 flex-1">
                {arrivalsData.map((busData, index) => {
                return <li key = {"bus-"+index.toString()}>{busData}</li>;
                })}
            </ol>
            {timeRemaining > 0 && <p className="font-bold mt-1">Bus times will refresh in {timeRemaining} seconds</p>}
        </section>
    )
}

export default UpcomingBuses