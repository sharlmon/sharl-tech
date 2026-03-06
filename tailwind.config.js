module.exports = {
    content: ["./*.html"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: { 900: '#050505', 800: '#0a0a0a', 700: '#111111', 600: '#1a1a1a' },
                accent: { blue: '#3b82f6', cyan: '#06b6d4', green: '#4ade80' }
            },
            fontFamily: {
                heading: ['Syncopate', 'sans-serif'],
                body: ['Space Grotesk', 'sans-serif'],
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries')
    ]
}
