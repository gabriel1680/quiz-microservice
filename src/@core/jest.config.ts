export default {
    displayName: {
        name: "@core",
        color: "blue",
    },
    moduleFileExtensions: ["js", "json", "ts"],
    moduleNameMapper: {
        "^src(.*)$": "<rootDir>/src/$1",
    },
    preset: "ts-jest",
    rootDir: ".",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "./coverage",
    testEnvironment: "node",
};
