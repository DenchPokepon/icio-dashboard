export default async function (dictonaryUrl) {
    const response = await fetch(dictonaryUrl,
    {
        method: 'GET',
        mode: 'cors',
        // headers: new Headers({'content-type': 'application/json'})
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json();
}
