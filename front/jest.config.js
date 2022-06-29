/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    snapshotSerializers: ["enzyme-to-json/serializer"],
    moduleNameMapper: {
        "^.+\\.(css|less|scss|sass)$": "babel-jest"
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

};