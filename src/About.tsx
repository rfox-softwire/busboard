import TFLOrigins from "./TFLOrigins.tsx"
import LiveBusData from "./LiveBusData.tsx"

function About() {
    return (
        <div className="mx-2">
            <h1 className="text-3xl font-bold text-center text-cyan-600 m-4">Buses</h1>
            <TFLOrigins />
            <LiveBusData />
        </div>
    )
}

export default About