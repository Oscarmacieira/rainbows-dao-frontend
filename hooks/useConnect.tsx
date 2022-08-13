import { useMoralis } from "react-moralis";
import { useTheme } from "../theme/theme";
export const useConnect = () => {
	const { theme } = useTheme();
	const {
		authenticate,
		logout,
		isAuthenticated,
		user,
		account,
		chainId,
		authError,
		isAuthenticating,
		Moralis,
	} = useMoralis();

	const login = async () => {
		await authenticate({
			provider: "web3Auth",

			chainId: Number(Moralis.Chains.POLYGON_MUMBAI),

			//	appLogo: logo,
			theme: theme.name === "Dark" ? "dark" : "light",
			clientId: process.env.NEXT_PUBLIC_WEB3AUTH,
		})
			.then(function (user) {
				user?.set("isOnline", true);
				user?.save();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const disconnect = async () => {
		user?.set("isOnline", false);
		await user?.save();
		await logout().then(function (user) {
			window.location.reload();
		});
	};

	return { login, disconnect };
};
