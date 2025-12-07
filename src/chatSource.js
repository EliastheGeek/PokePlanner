export function prompt(team, query) {
    return fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            team: team,
            query: query
        })
    }).then(r => r.json());
}