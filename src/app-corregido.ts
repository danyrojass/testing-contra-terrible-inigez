import {getNumber} from "./utils";

const API_URL = 'https://tormenta-codigo-app-terrible.vercel.app/api/podcast';

export interface Episode {
    number: string;
    duration: string;
    title: string;
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


function getTotalDuration(episodes: Episode[]): number {
    return episodes.reduce((sum, ep) => sum + getNumber(ep.duration, 'Duration'), 0);
}

function getNextEpisodeNumber(episodes: Episode[]): number {
    return getNumber(episodes[episodes.length - 1].number, 'Number') + 1;
}

function getShortestEpisode(episodes: Episode[]): Episode {
    return episodes.reduce((shortest, ep) =>
        (getNumber(ep.duration, 'Duration') < getNumber(shortest.duration, 'Duration') ? ep : shortest), episodes[0]);
}

function getShuffledEpisodes(episodes: Episode[]): Episode[] {
    for (let i = episodes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [episodes[i], episodes[j]] = [episodes[j], episodes[i]];
    }
    return episodes;
}

export function processEpisodes(episodes: Episode[]): void {
    if (!episodes || episodes.length === 0) return;

    // Convertir duration a números y ordenar episodios por number
    episodes.sort((a, b) => getNumber(a.number, 'Number') - getNumber(b.number, 'Number'));

    // Calcular el siguiente episode number
    const nextEpisodeNumber = getNextEpisodeNumber(episodes);

    // Calcular la suma total de duration
    const totalDuration = getTotalDuration(episodes);

    // Encontrar el episode más corto
    const shortestEpisode = getShortestEpisode(episodes);

    // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
    const shuffledEpisodes = getShuffledEpisodes(episodes)

    const twoHourLimit = 2 * 60 * 60; // 2 horas en segundos
    let durationSum = 0;
    const selectedTitles: string[] = [];

    for (const ep of shuffledEpisodes) {
        if (durationSum + getNumber(ep.duration, 'Duration') <= twoHourLimit) {
            durationSum += getNumber(ep.duration, 'Duration');
            if (ep.title != null) {
                selectedTitles.push(ep.title);
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
