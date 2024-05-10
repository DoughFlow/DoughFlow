import React from "react";
import GraphData from "../GraphData";

interface ListWatcherProps {
    results: string[];
}

const ListWatcher = ({ results }: ListWatcherProps) => {
    const topResult = results[0];  // Ensure this is outside useEffect since we need it for rendering

    return (
        <div>
            {topResult ? <GraphData ticker={topResult} size={1}/> : <p></p>}
        </div>
    );
};

export default ListWatcher;

