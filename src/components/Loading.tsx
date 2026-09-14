import { Arc } from "./arc";
import Grainient from "./Grainient";

export default function LoadingScreen() {
    return (
        <div className="Loading">
            <div className="Grainient">
                <Grainient />
            </div>
            <div>
                <Arc className="size-14" />
            </div>
        </div>
    );
}
