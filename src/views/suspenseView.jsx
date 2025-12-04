export function SuspenseView(props) {return conditionalSuspense(props);}

function conditionalSuspense(props) {
    if (!props.promise) return <span>no data</span>;
    if (props.error) return <span>{props.error.toString()}</span>
    return <img src="https://brfenergi.se/iprog/loading.gif"/>
}