import 'styled-components';

declare module 'styled-components' {
	// eslint-disable-next-line prettier/prettier
	export interface DefaultTheme {
		lightColor?: {
			pink: {
				background: string;
				main: string;
				sub: string;
				point: string;
			};
			yellow: {
				background: string;
				main: string;
				sub: string;
				point: string;
			};
			blue: {
				background: string;
				main: string;
				sub: string;
				point: string;
			};
			green: {
				background: string;
				main: string;
				sub: string;
				point: string;
			};
			purple: {
				background: string;
				main: string;
				sub: string;
				point: string;
			};
		};
		darkColor?: {
			background: string;
			main: string;
			sub: string;
			point: string;
		};

		textColor: {
			white: string;
			black: string;
			lightgray: string;
			darkgray: string;
			lightbrown: string;
			darkbrown: string;
		};

		fontWeight: {
			light: string;
			regular: string;
			medium: string;
			semibold: string;
			bold: string;
		};

		fontSize: {
			xs: string;
			sm: string;
			base: string;
			lg: string;
			xl: string;
			'2xl': string;
			'3xl': string;
			'4xl': string;
			'5xl': string;
			'6xl': string;
			'7xl': string;
		};
	}
}
