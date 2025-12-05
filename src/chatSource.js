export function prompt(query) {
    return fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    }).then(r => r.json());
}