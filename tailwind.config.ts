import type { Config } from 'tailwindcss'
import tailwindcssForms from '@tailwindcss/forms'
import tailwindcssTypography from '@tailwindcss/typography'
import tailwindcssAspectRatio from '@tailwindcss/aspect-ratio'
import tailwindContainerQueries from '@tailwindcss/container-queries'
import tailwindScrollbarHide from 'tailwind-scrollbar-hide'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.ts',
    './app.vue',
    './error.vue',
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      fontSize: {
        '6xlb': ['64px', '1.2'],
      },
      margin: {
        heroTop: '14rem',
      },
      containers: {
        '2xs': '16rem',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        'text-nav-gray': '#191919',
        'text-gray': '#222222',
        'text-grey': '#535965',
        'custom-blue': 'rgb(52, 142, 242)',
        primary: {
          DEFAULT: '#348EF2',
          light: '#E1EFFE',
          dark: '#2A72C2',
          darker: '#0082DB',
          darkest: '#',
        },
        secondary: {
          DEFAULT: '#60B8B8',
          light: '',
          dark: '#407A7A', // lightness reduced by 7%
          darkest: '',
        },

        tertiary: {
          DEFAULT: '#727782',
          light: '#D1D1D1',
          lightest: '#F9F9F9',
          dark: '#2A2B2E',
          darkest: '#191919',
        },
        neutral: {
          'text-gray': '#222222',
          500: 'E5E5EF',
        },
        gray: {
          1: '#F3F8FE',
          2: '#8998A9',
          3: '#D9D9D9',
        },
        orange: {
          DEFAULT: '#FEB649',
        },
        fui: {
          primary: '#60B8B8',
          hover: '#407A7A',
        },
      },
      fontFamily: {
        heading: "'Montserrat', sans-serif",
        newNavMenu: "'Inter', sans-serif",
      },
      aspectRatio: {
        genericcardthumb: '355 / 190',
        fullimagecard: '395 / 400',
        fullimageshallowcard: '355 / 265',
      },
      maxWidth: ({ theme }) => ({
        ...theme('spacing'),
        container: '71.75rem', // 1148px
        article: '46.875rem', // 750px
        'container-header': '90rem', // 1440px
        'information-container-header': '54rem', // 864px
        'product-container-header': '72.5625rem', // 1161px
        'browse-all': '16rem',
      }),
      minWidth: ({ theme }) => ({
        ...theme('spacing'),
      }),
      minHeight: ({ theme }) => ({
        ...theme('spacing'),
      }),
      borderRadius: {
        forminput: '30px',
        table: '20px',
      },
      backgroundImage: {
        'chevron-select':
          'url(\'data:image/svg+xml,%3Csvg width="6" height="4" viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 .8.75 0 2.999 2.399 5.25 0 6 .8 3 4z" transform="translate(-673.000000, -711.000000) translate(345.000000, 671.000000) translate(328.000000, 40.000000)" fill="%23111214" fill-rule="evenodd"/%3E%3C/svg%3E\')',
        'pagination-icon-prev':
          'url(\'data:image/svg+xml,%3Csvg width="18" height="11" viewBox="0 0 18 11" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M4.94974747,3.99680289e-14 L5.65685425,0.707106781 L1.914,4.449 L17.4497475,4.44974747 L17.4497475,5.44974747 L1.914,5.449 L5.65685425,9.19238816 L4.94974747,9.89949494 L0.5,5.449 L0.449747468,5.44974747 L0.449,5.398 L-7.37188088e-14,4.94974747 L0.449,4.5 L0.449747468,4.44974747 L0.5,4.449 L4.94974747,3.99680289e-14 Z" transform="translate(-528.000000, -2737.000000) translate(528.000000, 2724.000000) translate(0.000000, 12.500000) translate(0.000000, 1.000000)" fill="%23fff" fill-rule="nonzero"/%3E%3C/svg%3E\')',
        'pagination-icon-next':
          'url(\'data:image/svg+xml,%3Csvg width="18" height="11" viewBox="0 0 18 11" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M4.94974747,3.99680289e-14 L5.65685425,0.707106781 L1.914,4.449 L17.4497475,4.44974747 L17.4497475,5.44974747 L1.914,5.449 L5.65685425,9.19238816 L4.94974747,9.89949494 L0.5,5.449 L0.449747468,5.44974747 L0.449,5.398 L-7.37188088e-14,4.94974747 L0.449,4.5 L0.449747468,4.44974747 L0.5,4.449 L4.94974747,3.99680289e-14 Z" transform="translate(-895.000000, -2736.000000) translate(528.000000, 2724.000000) translate(0.000000, 12.500000) translate(376.174621, 4.949747) rotate(-180.000000) translate(-376.174621, -4.949747) translate(367.449747, 0.000000) translate(0.000000, 0.000000)" fill="%23fff" fill-rule="nonzero"/%3E%3C/svg%3E\')',
        'input-search-icon-clear':
          'url(\'data:image/svg+xml,%3Csvg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M14,0 L14.9899495,0.989949494 L8.484,7.495 L14.9899495,14 L14,14.9899495 L7.495,8.484 L0.989949494,14.9899495 L0,14 L6.506,7.495 L0,0.989949494 L0.989949494,0 L7.495,6.506 L14,0 Z" transform="translate(-1268.000000, -541.000000) translate(1268.505025, 541.505025)" fill="%23373E43" fill-rule="nonzero"/%3E%3C/svg%3E\')',
        'pattern-1':
          'url(\'data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg transform="translate(-402.000000, -82.000000) translate(402.000000, 82.000000)" fill="none" fill-rule="evenodd"%3E%3Cpath stroke="%232A2B2E" d="M2.5 42.5H17.5V57.5H2.5z"/%3E%3Cpath stroke="%232A2B2E" d="M2.5 62.5H17.5V77.5H2.5z"/%3E%3Cpath stroke="%232A2B2E" d="M22.5 62.5H37.5V77.5H22.5z"/%3E%3Cpath stroke="%232A2B2E" d="M22.5 42.5H37.5V57.5H22.5z"/%3E%3Cpath stroke="%232A2B2E" d="M2.5 2.5H17.5V17.5H2.5z"/%3E%3Cpath stroke="%232A2B2E" d="M2.5 22.5H17.5V37.5H2.5z"/%3E%3Cpath stroke="%232A2B2E" d="M22.5 22.5H37.5V37.5H22.5z"/%3E%3Cpath stroke="%232A2B2E" d="M22.5 2.5H37.5V17.5H22.5z"/%3E%3Cpath stroke="%232A2B2E" d="M42.5 42.5H57.5V57.5H42.5z"/%3E%3Cpath stroke="%232A2B2E" d="M42.5 62.5H57.5V77.5H42.5z"/%3E%3Cpath stroke="%232A2B2E" d="M62.5 62.5H77.5V77.5H62.5z"/%3E%3Cpath stroke="%232A2B2E" d="M62.5 42.5H77.5V57.5H62.5z"/%3E%3Cpath stroke="%232A2B2E" d="M42.5 2.5H57.5V17.5H42.5z"/%3E%3Cpath stroke="%232A2B2E" d="M42.5 22.5H57.5V37.5H42.5z"/%3E%3Cpath stroke="%232A2B2E" d="M62.5 22.5H77.5V37.5H62.5z"/%3E%3Cpath stroke="%232A2B2E" d="M62.5 2.5H77.5V17.5H62.5z"/%3E%3Ccircle stroke="%232A2B2E" fill="%232A2B2E" cx="70" cy="10" r="1.5"/%3E%3Ccircle stroke="%232A2B2E" fill="%232A2B2E" cx="10" cy="10" r="1.5"/%3E%3Ccircle stroke="%232A2B2E" fill="%232A2B2E" cx="70" cy="70" r="1.5"/%3E%3Ccircle stroke="%232A2B2E" fill="%232A2B2E" cx="10" cy="70" r="1.5"/%3E%3Cpath d="M0 0H80V80H0z"/%3E%3C/g%3E%3C/svg%3E\')',
        'main-nav-caret':
          'url(\'data:image/svg+xml,%3Csvg width="6" height="4" viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 .8.75 0 2.999 2.399 5.25 0 6 .8 3 4z" fill="%23000" fill-rule="evenodd"/%3E%3C/svg%3E\')',
        'main-nav-caret-white':
          'url(\'data:image/svg+xml,%3Csvg width="6" height="4" viewBox="0 0 6 4" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 .8.75 0 2.999 2.399 5.25 0 6 .8 3 4z" fill="%23fff" fill-rule="evenodd"/%3E%3C/svg%3E\')',
      },
      scale: {
        70: '.70',
      },
      opacity: {
        45: '0.45',
        85: '0.85',
      },
      transitionDelay: {
        0: '0ms',
      },
      spacing: {
        18: '72px',
        10.5: '42px',
        22: '88px',
        30: '120px',
      },
      zIndex: {
        1: '1',
      },
      inset: {
        screen: '100vh',
      },
    },
  },
  plugins: [
    tailwindcssForms,
    tailwindcssTypography,
    tailwindcssAspectRatio,
    tailwindContainerQueries,
    tailwindScrollbarHide,
  ],
}
