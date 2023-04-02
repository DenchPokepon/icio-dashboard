export default async function (body) {
    const API_URL = "https://icio-analysis-api.kohea.tel/io_graph"
    const response = await fetch(API_URL,
    {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(
            {
                values: body
            })
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json();
}

