const heading = {
    fontFamily: 'heading',
    fontWeight: 'heading',
}

export default {
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'Staatliches, sans-serif'
    },
    colors: {
        text: '#111',
        background: '#eee',
        muted: '#444',
        accent: '#633',
    },
    fontSizes: [12, 16, 24, 30, 48, 72],
    fontWeights: {
        body: 400,
        heading: 700,
    },
    styles: { // for elements rendered in MDX only
        h1: {
            ...heading,
            fontSize: 6,
            m: 0,
        },
    }
}