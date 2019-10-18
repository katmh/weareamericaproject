/*const heading = {
    fontFamily: 'heading',
    fontWeight: 'heading',
    m: 0
}*/

const text = {
    lineHeight: '130%',
    color: 'text',
    fontFamily: 'body'
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
    fontSizes: [12, 16, 24, 28, 36, 48, 80],
    fontWeights: {
        heading: 400, // Staatliches only has 400 weight
        body: 400,
    },
    styles: { // for elements rendered in MDX only
        h3: {
            ...text,
            fontSize: [2, 3],
            fontWeight: 300,
            lineHeight: '130%',
            my: [4, 4, 5],
            mx: [4, 4, 6]
        },
    }
}