import { createContext, useState } from "react";
import { useMoralisCloudFunction, useMoralis } from "react-moralis";
import { useLoopData } from "../hooks/Loop/useLoopData";
import { useRouter } from "../node_modules/next/router";

export const LoopContext = createContext<any>(null!);

export const LoopContextProvider = ({ children: children }) => {
	const router = useRouter();
	const { loopAddress } = router.query;
	const { user } = useMoralis();
	const [loopDetail, setLoopDetail] = useState({
		title: "",
		description: "",
		state: "",
		memberCount: 0,
		itemCount: 0,
		balance: 0,
	});

	const { getLoopData, loopData } = useLoopData(loopAddress);

	const [loopContracts, setLoopContracts] = useState({
		loop: loopAddress,
		plan: "",
		token: "",
		timelock: "",
		governor: "",
		treasury: "",
		actions: "",
	});

	const getLoopDetail = () => {

 }


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
		loopContracts,
		loopDetail,
	};

	return <LoopContext.Provider value={value}>{children}</LoopContext.Provider>;
};
