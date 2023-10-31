import {getNumber} from "./utils";

const API_URL = 'https://tormenta-codigo-app-terrible.vercel.app/api/podcast/terrible';

export interface Episode {
    number: string | number;
    duration: string | number;
    title: string | null;
    excerpt: string;
    published_at: number;
}

export interface Podcast {
    data: Episode[];
}


async function fetchEpisodes(): Promise<Episode[]> {
    try {
        const response = await fetch(API_URL);
        const responseData = await response.json() as Podcast;
        return responseData.data;
    } catch (error) {
        console.error('Error fetching the episodes:', error);
        return [];
    }
}

export function processEpisodes(episodes: Episode[]): void {
    if (!episodes || episodes.length === 0) return;

    episodes.sort((a, b) =>
        getNumber(a.number, 'Number') - getNumber(b.number, 'Number')
    );

    // Calcular el siguiente episode number
    const nextEpisodeNumber =
        getNumber(episodes[episodes.length - 1].number, 'Number') + 1;

    // Calcular la suma total de duration
    const totalDuration = episodes.reduce((sum, ep) =>
            sum + getNumber(ep.duration, 'Duration'), 0);

    // Encontrar el episode más corto
    const shortestEpisode = episodes.reduce(
        (shortest, ep) => (getNumber(ep.duration, 'Duration') < getNumber(shortest.duration, 'Duration')? ep : shortest), episodes[0]
    );

    // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
    const shuffledEpisodes = [...episodes].sort(() => Math.random() - 0.5);

    const twoHourLimit = 2 * 60 * 60; // 2 horas en segundos
    let durationSum = 0;
    const selectedTitles: string[] = [];

    for (const ep of shuffledEpisodes) {
        const duration = getNumber(ep.duration, 'Duration');
        if (durationSum + duration <= twoHourLimit) {
            durationSum += duration;
            if (ep.title != null) {
                selectedTitles.push(ep.title);
            } else {
                console.log(`Title is null for episode number: ${ep.number}`);
            }
        }
    }

    // Imprimir resultados
    console.log('Next episode number:', nextEpisodeNumber);
    console.log('Total duration of all episodes:', totalDuration);
    console.log('Number of the shortest episode:', shortestEpisode.number);
    console.log('Titles below 2 hours:', selectedTitles);
}

async function main() {
    const episodes = await fetchEpisodes();
    processEpisodes(episodes);
}

main();
