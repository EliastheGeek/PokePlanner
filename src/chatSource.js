import { API_URL } from "/src/backendConfig.js"

export function prompt(team, query) {
    return fetch(`${API_URL}/api/chat`, {
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