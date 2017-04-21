export const typeDefs = `
    type characteristics {
        mobiliteit: Int
        blaascontrole: Int
        socialeActiviteit: Int
        energie: Int
        cognitie: Int
    }

    type Query {
        values: [characteristics]
    }
`;