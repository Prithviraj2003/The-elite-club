module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: ["class", "class"],
  theme: {
  	screens: {
  		md: {
  			max: '1050px'
  		},
  		sm: {
  			max: '550px'
  		}
  	},
  	extend: {
  		colors: {
  			amber: {
  				'500': 'var(--amber_500)',
  				'500_01': 'var(--amber_500_01)'
  			},
  			black: {
  				'900_01': 'var(--black_900_01)'
  			},
  			blue: {
  				'700': 'var(--blue_700)',
  				a200: 'var(--blue_a200)'
  			},
  			blue_gray: {
  				'100': 'var(--blue_gray_100)',
  				'200': 'var(--blue_gray_200)',
  				'300': 'var(--blue_gray_300)',
  				'600': 'var(--blue_gray_600)',
  				'700': 'var(--blue_gray_700)',
  				'200_01': 'var(--blue_gray_200_01)',
  				'900_01': 'var(--blue_gray_900_01)',
  				'900_0c': 'var(--blue_gray_900_0c)'
  			},
  			gray: {
  				'200': 'var(--gray_200)',
  				'300': 'var(--gray_300)',
  				'400': 'var(--gray_400)',
  				'500': 'var(--gray_500)',
  				'600': 'var(--gray_600)',
  				'800': 'var(--gray_800)',
  				'100_01': 'var(--gray_100_01)',
  				'200_02': 'var(--gray_200_02)',
  				'300_01': 'var(--gray_300_01)',
  				'400_01': 'var(--gray_400_01)',
  				'500_02': 'var(--gray_500_02)',
  				'800_01': 'var(--gray_800_01)',
  				'800_02': 'var(--gray_800_02)'
  			},
  			green: {
  				'400': 'var(--green_400)',
  				'600': 'var(--green_600)',
  				'700': 'var(--green_700)',
  				'800': 'var(--green_800)',
  				'900': 'var(--green_900)',
  				'600_01': 'var(--green_600_01)'
  			},
  			red: {
  				'500': 'var(--red_500)',
  				'800': 'var(--red_800)'
  			},
  			teal: {
  				'400': 'var(--teal_400)'
  			},
  			white: {
  				a700: 'var(--white_a700)',
  				a700_4c: 'var(--white_a700_4c)',
  				a700_cc: 'var(--white_a700_cc)'
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
  			}
  		},
  		boxShadow: {},
  		fontFamily: {
  			inter: 'Inter',
  			chivo: 'Chivo'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
