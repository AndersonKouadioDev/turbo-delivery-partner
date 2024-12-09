/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const { nextui } = require('@nextui-org/react');

const rotateX = plugin(function ({ addUtilities }) {
    addUtilities({
        '.rotate-y-180': {
            transform: 'rotateY(180deg)',
        },
    });
});
module.exports = {
    content: [
        './App.tsx',
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    light: 'hsl(var(--primary))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                    light: 'hsl(var(--secondary))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                    light: 'hsl(var(--destructive))',
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))',
                    light: 'hsl(var(--info))',
                },
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                    light: 'hsl(var(--success))',
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))',
                    light: 'hsl(var(--warning))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                danger: {
                    DEFAULT: 'hsl(var(--danger))',
                    foreground: 'hsl(var(--danger-foreground))',
                    light: 'hsl(var(--danger))',
                },
                dark: {
                    DEFAULT: 'hsl(var(--dark))',
                    light: 'hsl(var(--dark-light))',
                    'dark-light': 'rgba(59,63,92,.15)',
                },
                black: {
                    DEFAULT: 'hsl(var(--black))',
                    light: 'hsl(var(--black-light))',
                    'dark-light': 'rgba(14,23,38,.15)',
                },
                white: {
                    DEFAULT: 'hsl(var(--white))',
                    light: 'hsl(var(--white-light))',
                    dark: 'rgba(255,255,255,0.5)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                nunito: ['var(--font-nunito)'],
            },
            spacing: {
                4.5: '18px',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-invert-headings': theme('colors.foreground'),
                        '--tw-prose-invert-links': theme('colors.foreground'),
                        h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0, color: theme('colors.foreground') },
                        h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0, color: theme('colors.foreground') },
                        h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0, color: theme('colors.foreground') },
                        h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0, color: theme('colors.foreground') },
                        h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0, color: theme('colors.foreground') },
                        h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0, color: theme('colors.foreground') },
                        p: { marginBottom: '0.5rem', color: theme('colors.foreground') },
                        li: { margin: 0, color: theme('colors.muted-foreground') },
                        img: { margin: 0 },
                    },
                },
            }),
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'border-beam': {
                    '100%': {
                        'offset-distance': '100%',
                    },
                },
                'image-glow': {
                    '0%': {
                        opacity: '0',
                        'animation-timing-function': 'cubic-bezier(0.74, 0.25, 0.76, 1)',
                    },
                    '10%': {
                        opacity: '0.7',
                        'animation-timing-function': 'cubic-bezier(0.12, 0.01, 0.08, 0.99)',
                    },
                    '100%': {
                        opacity: '0.4',
                    },
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(-10px)' },
                    to: { opacity: '1', transform: 'none' },
                },
                'fade-up': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'none' },
                },
                shimmer: {
                    '0%, 90%, 100%': {
                        'background-position': 'calc(-100% - var(--shimmer-width)) 0',
                    },
                    '30%, 60%': {
                        'background-position': 'calc(100% + var(--shimmer-width)) 0',
                    },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' },
                },
                'marquee-vertical': {
                    from: { transform: 'translateY(0)' },
                    to: { transform: 'translateY(calc(-100% - var(--gap)))' },
                },
                ripple: {
                    '0%, 100%': {
                        transform: 'translate(-50%, -50%) scale(1)',
                    },
                    '50%': {
                        transform: 'translate(-50%, -50%) scale(0.9)',
                    },
                },
                'caret-blink': {
                    '0%,70%,100%': { opacity: '1' },
                    '20%,50%': { opacity: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
                'image-glow': 'image-glow 4100ms 600ms ease-out forwards',
                'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards',
                'fade-up': 'fade-up 1000ms var(--animation-delay, 0ms) ease forwards',
                shimmer: 'shimmer 8s infinite',
                marquee: 'marquee var(--duration) infinite linear',
                'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
                ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
                'caret-blink': 'caret-blink 1.25s ease-out infinite',
            },
        },
    },
    plugins: [
        nextui(),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
        rotateX,
    ],
};
