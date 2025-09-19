interface OriginsData {
    year: string,
    text: string,
    imgSource: string,
    imgCaption: string,
    source: string,
}

export async function getOriginsData(): Promise<OriginsData[]> {
    const response = await fetch("../data/originsData.json");
    const jsonData: OriginsData[] = await response.json() as OriginsData[];
    return jsonData;
}
    
