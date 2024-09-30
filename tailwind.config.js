/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
  	fontFamily: {
  		Poppins: ['Poppins'],
  		Bills_Bold: ['PostNoBillsColombo-Bold']
  	},
  	screens: {
  		'3xl': {
  			max: '1540px'
  		},
  		'2xl': {
  			max: '1441px'
  		},
  		xl: {
  			max: '1281px'
  		},
  		lg: {
  			max: '1025px'
  		},
  		md: {
  			max: '769px'
  		},
  		sm: {
  			max: '641px'
  		},
  		xs: {
  			max: '432px'
  		}
  	},
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			system: {
  				neutro: '#EFEFEF',
  				light: '#EFEFEF80',
  				cinza: '#7F828C',
  				red: '#EF4444',
  				green: '#10B981'
  			},
  			primary: {
  				default: '#243060',
  				hover: '#161d3b',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				default: '#C8D753',
  				hover: '#b7c82f',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		boxShadow: {
  			shadowP: '#00000033 0px 3px 4px;'
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
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-3x': {
          textShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 3px'
        },
        '.text-shadow-4x': {
          textShadow: 'rgba(0, 0, 0, 0.4) 0px 4px 4px'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
