module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
