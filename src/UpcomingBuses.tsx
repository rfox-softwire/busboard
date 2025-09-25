function UpcomingBuses({ arrivalsData }: {arrivalsData: string[]}) {
    return (
        <section>
            <ol className="list-decimal ml-5 flex-1">
                {arrivalsData.map((busData, index) => {
                return <li key = {"bus-"+index.toString()}>{busData}</li>;
                })}
            </ol>
            
        </section>
    );
}

export default UpcomingBuses;
