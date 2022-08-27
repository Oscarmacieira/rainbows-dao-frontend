import { MoralisProvider } from "react-moralis";
import { ThemeProvider } from "styled-components";
import themes from "../theme/schema";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AppStyles } from "../styles/AppStyles";
import { useTheme } from "../theme/theme";
import Header from "../components/layout/Header/index";
import "react-toastify/dist/ReactToastify.css";
import { CustomToaster } from "../components/items/toast/index";
import { UserContextProvider } from "../contexts/UserContextProvider";

function App({ Component, pageProps }: AppProps) {
	const { theme, themeLoaded } = useTheme();
	const [selectedTheme, setSelectedTheme] = useState(theme);

	const changeTheme = () => {
		selectedTheme.name === "Light"
			? setSelectedTheme(themes.data.dark)
			: setSelectedTheme(themes.data.light);
	};

	if (!themeLoaded) return <></>;
	return (
		<MoralisProvider
			initializeOnMount={true}
			appId={process.env.NEXT_PUBLIC_APP_ID}
			serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
		>
			<ThemeProvider theme={selectedTheme}>
				<AppStyles />
				<UserContextProvider>
					<Header
						changeTheme={() => changeTheme()}
						selectedTheme={selectedTheme}
					/>
					<Component {...pageProps} />
				</UserContextProvider>{" "}
				<CustomToaster
					position="top-right"
					autoClose={8000}
					hideProgressBar={false}
					newestOnTop={false}
					draggable={false}
				/>{" "}
			</ThemeProvider>
		</MoralisProvider>
	);
}

export default App;
