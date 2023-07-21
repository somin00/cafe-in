import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
	lightColor: {
		pink: {
			background: '#FFF2F2',
			main: ' #EF9F9F',
			sub: ' #F47C7C',
			point: '#eb4d4b',
		},
		yellow: {
			background: '#FFF1DD',
			main: '#FFC26F',
			sub: '#FFC000',
			point: '#C38154',
		},
		blue: {
			background: '#D1EFFE',
			main: '#4B9AD3',
			sub: ' #0070c0',
			point: '#00b0f0',
		},
	},
	textColor: {
		black: '#000000',
		white: '#ffffff',
		lightgray: '#d9d9d9',
		darkgray: '#808080',
		lightbrown: '#eeeeee',
		darkbrown: '#726868',
	},

	fontWeight: {
		light: '300',
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},

	fontSize: {
		xs: '0.75rem', // 12px
		sm: '0.875rem', // 14px
		base: '1rem', // 16px
		lg: '1.125rem', // 18px
		xl: '1.25rem', // 20px
		'2xl': '1.5rem', // 24px
		'3xl': '1.75rem', // 28px
		'4xl': '1.875rem', // 30px
		'5xl': '2.25rem', // 36px
		'6xl': '3rem', // 48px
		'7xl': '4rem', // 64px
	},
};

export const darkTheme: DefaultTheme = {
	darkColor: {
		background: '#D1EFFE',
		main: '#4B9AD3',
		sub: ' #0070c0',
		point: '#00b0f0',
	},
	textColor: {
		black: '#000000',
		white: '#ffffff',
		lightgray: '#d9d9d9',
		darkgray: '#808080',
		lightbrown: '#eeeeee',
		darkbrown: '#726868',
	},

	fontWeight: {
		light: '300',
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},

	fontSize: {
		xs: '0.75rem', // 12px
		sm: '0.875rem', // 14px
		base: '1rem', // 16px
		lg: '1.125rem', // 18px
		xl: '1.25rem', // 20px
		'2xl': '1.5rem', // 24px
		'3xl': '1.75rem', // 28px
		'4xl': '1.875rem', // 30px
		'5xl': '2.25rem', // 36px
		'6xl': '3rem', // 48px
		'7xl': '4rem', // 64px
	},
};
