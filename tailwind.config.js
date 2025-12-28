/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: "#FF4F00", // Lagos Orange
                    navy: "#003366",   // Trust Navy
                    gray: "#F4F4F4",
                },
                store: {
                    jendol: "#6B21A8", // Purple
                    justrite: "#E11D48", // Red
                    shoprite: "#DC2626", // Shoprite Red
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}