const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./index.html', './frontend/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif']
        },
        listStyleType: {
            disc: 'disc',
            decimal: 'decimal',
            circle: 'circle'
        },
        extend: {}
    },
    plugins: []
});
