/*const heading = {
    fontFamily: 'heading',
    fontWeight: 'heading',
    m: 0
}*/

const text = {
    lineHeight: '135%',
    color: 'text',
    fontFamily: 'body',
}

export default {
    fonts: {
        body: 'Lato, sans-serif',
        heading: 'Staatliches, sans-serif'
    },
    colors: {
        text: '#222',
        background: '#eee',
        accent: '#633',
        muted: '#444',
    },
    fontSizes: [16, 20, 24, 28, 36, 48, 80],
    fontWeights: {
        heading: 400, // Staatliches only has 400 weight
        body: 400,
    },
    body: {
        ...text,
        fontSize: 0,
    },
    h3: {
        ...text,
        fontSize: [2, 3],
        fontWeight: 300,
        mb: [4, 5],
        mx: [3, 6],
    },
    styles: {
        root: {

        },
        h1: {
            fontSize: [4, 5],
            fontFamily: 'heading',
            fontWeight: '400',
            my: 0,
            color: 'accent'
        },
        h2: {
            fontSize: [3, 4],
            fontFamily: 'heading',
            fontWeight: '400',
            color: 'text',
            mt: 3,
        },
        h3: {
            ...text,
            fontSize: [2, 3],
            fontWeight: 300,
            lineHeight: '130%',
            mb: [4, 5],
            mx: [3, 6]
        },
        p: {
            ...text,
            fontSize: [0, 1],
            fontWeight: 300,
            lineHeight: ['135%', '145%'],
            my: [2, 3]
        },
        a: {
            color: 'accent'
        },
        img: {
            maxWidth: '100%'
        }
    }
}