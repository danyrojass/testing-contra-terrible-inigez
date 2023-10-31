import {Episode, processEpisodes} from '../src/app';

describe('processEpisodes', () => {
    it('should ensure titles are not null', () => {
        const episodes: Episode[] = [
            {
                number: '1',
                duration: '30',
                title: null,
                excerpt: 'Lorem ipsum',
                published_at: 1234567890,
            },
        ];
        const consoleSpy = jest.spyOn(console, 'log');
        processEpisodes(episodes);
        expect(consoleSpy).toHaveBeenCalledWith('Title is null for episode number: 1');
    });

    it('should ensure number and duration are numbers', () => {
        // Crear datos de episodios con "number" y "duration" no numéricos
        const episodes: Episode[] = [
            {
                number: 'x',
                duration: 'y',
                title: 'Episode 1',
                excerpt: 'Lorem ipsum',
                published_at: 1234567890,
            },
        ];

        // Ejecutar la función de prueba
        const consoleSpy = jest.spyOn(console, 'log');
        processEpisodes(episodes);

        // Realizar afirmaciones para verificar que se haya impreso un mensaje de error
        expect(consoleSpy).toHaveBeenCalledWith('Number: x is not a number.');
    });
});
