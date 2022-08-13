import { useState } from "react";
import { useMoralisCloudFunction } from "react-moralis";
export const useUserData = ({ userAddress }) => {
	const { fetch } = useMoralisCloudFunction(
		"getUserDetail",
		{
			address: userAddress,
		},
		{ autoFetch: false }
	);
	const [userData, setUserData] = useState({
		username: "",
		wallet: "",
		avatar: "",
		about: "",
	});

	const fetchUserData = () => {
		fetch()
			.then((data: any) => setUserData(data))
			.catch((err: any) => console.log(err));
	};

	return { fetchUserData, userData };
};
