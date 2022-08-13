import { useEffect, useState } from "react";
import { storage } from "../utils/storage";
import { default as schema } from "./schema";

export const useTheme = () => {
	const themes = storage.get("themes");
	const [theme, setTheme] = useState(schema.data.light);
	const [themeLoaded, setThemeLoaded] = useState(false);

	const setMode = (mode: any) => {
		storage.set("theme", mode);
		setTheme(mode);
	};

	useEffect(() => {
		//const localTheme = storage.get("theme");
		//	localTheme ? setTheme(localTheme) : setTheme(themes?.data[themes.default]);
		//	setThemeLoaded(true);
		const localTheme = storage.get("theme");
		if (!localTheme) {
			setTheme(schema.data.light);
		} else {
			setTheme(localTheme);
		}
		setThemeLoaded(true);
	}, []);

	return { theme, themeLoaded, setMode };
};
