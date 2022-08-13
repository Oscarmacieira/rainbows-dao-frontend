import { createContext, useState } from "react";
import { useMoralisCloudFunction, useMoralis } from "react-moralis";

export const UserContext = createContext<any>(null!);

export const UserContextProvider = ({ children: children }) => {
	const { user } = useMoralis();
	const { fetch } = useMoralisCloudFunction(
		"getUserDetail",
		{
			address: "",
		},
		{ autoFetch: false }
	);
	const [userDetail, setUserDetail] = useState({
		username: "",
		wallet: "",
		avatar: "",
		about: "",
	});

	const getUserDetail = (userAddress = user?.get("ethAddress")) => {
		fetch({
			params: {
				address: userAddress,
			},
		})
			.then((data: any) => setUserDetail(data))
			.catch((err: any) => console.log(err));
	};

	const editAvatar = async (newFile: any, onSuccess = () => {}) => {
		user?.set("avatar", newFile);
		await user?.save().then((data: any) => onSuccess());
	};

	const editUsername = async (
		newUsername: string,
		onSuccess = () => {},
		onError = () => {}
	) => {
		user?.set("username", newUsername);
		await user
			?.save()
			.then((data: any) => onSuccess())
			.catch((error: any) => onError());
	};

	const editAbout = async (
		newAbout: string,
		onSuccess = () => {},
		onError = () => {}
	) => {
		user?.set("about", newAbout);
		await user
			?.save()
			.then((data: any) => onSuccess())
			.catch((error: any) => onError());
	};

	const value = {
		userDetail,
		getUserDetail,
		editAbout,
		editUsername,
		editAvatar,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
