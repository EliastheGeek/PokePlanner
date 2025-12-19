import { API_URL } from "/src/backendConfig.js"

export function prompt(obj, query, note) {
    return fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            obj: obj,
            query: query,
            note: note
        })
    }).then(r => r.json());
}