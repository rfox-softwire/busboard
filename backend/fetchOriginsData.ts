export async function getOriginsData() {
    const response = await fetch("../data/originsData.json")
    const jsonData = await response.json()
    return jsonData
}
    