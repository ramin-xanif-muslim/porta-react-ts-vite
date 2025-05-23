/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    	extend: {
    		fontFamily: {
    			manrope: ["Manrope", "sans-serif"]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
					bg: {
						DEFAULT: 'var(--app-background)',
						foreground: 'var(--foreground)',
					},
    			brand: {
					'50': 'var(--brand-color-50)',
					'100': 'var(--brand-color-100)',
					'200': 'var(--brand-color-200)',
					'300': 'var(--brand-color-300)',
    				'400': 'var(--brand-color-400)',
    				'500': 'var(--brand-color-500)',
    				'600': 'var(--brand-color-600)',
    				'700': 'var(--brand-color-700)',
    				'800': 'var(--brand-color-800)',
    				'900': 'var(--brand-color-900)',
    				DEFAULT: 'var(--brand-color)'
    			},
    			grayColor: {
    				'50': '#F3F4F6FF',
    				'400': '#A7B9C4',
    				'600': '#9095A1FF'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))'
    			}
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};
