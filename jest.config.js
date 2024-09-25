module.exports = {
    preset: 'ts-jest',
    transform: {
        "^.+\\.(ts|tsx)$": "babel-jest",
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transformIgnorePatterns: ['/node_modules/'],
    testEnvironment: 'jsdom',
};