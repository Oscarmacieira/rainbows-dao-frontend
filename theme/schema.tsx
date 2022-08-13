import { colorPalette, typography } from "./style-guide";

const themes = {
	data: {
		light: {
			id: "T_001",
			name: "Light",
			palette: colorPalette.lightMode,
			colors: {
				body: colorPalette.lightMode.background,
				text: colorPalette.lightMode.primary,
				button: {
					text: "#FFFFFF",
					background: "#000000",
				},
				link: {
					text: "teal",
					opacity: 1,
				},
			},
			font: typography.text,
		},
		dark: {
			id: "T_002",
			name: "Dark",
			palette: colorPalette.darkMode,
			colors: {
				body: colorPalette.darkMode.background,
				text: colorPalette.darkMode.primary,
				button: {
					text: colorPalette.darkMode.primary,
					background: colorPalette.darkMode.secondary,
				},
				link: {
					text: colorPalette.darkMode.secondary,
					opacity: 1,
				},
			},
			font: typography.text,
		},
	},
	default: "Light",
};

export default themes;
