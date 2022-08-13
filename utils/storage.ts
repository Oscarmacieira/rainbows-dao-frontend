export const storage = {
	set: (key: string, value: any) => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	},

	get: (key: string) => {
		if (typeof window !== "undefined") {
			const value: any = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : null;
		}
	},
};
