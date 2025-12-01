import { useSelector } from "react-redux";
import { SummaryView } from "/src/views/summaryView.jsx";

export function Summary(){
    const hello = useSelector(
        (state) => state.poke.hello
    );

    return <SummaryView nello={hello}/>;
};
