import { useContext, useEffect, useState } from "react";
import { useApiContract, useMoralis } from "react-moralis";
import UnitTokenAbi from "../../constants/abi/contracts/UnitToken.sol/UnitToken.json";
import contracts from "../../constants/contractAddresses.json";
import ABI from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { UserContext } from "../../contexts/UserContextProvider";

export const useLoopData = (loopAddress: any) => {
	const { Moralis, chainId, user } = useMoralis();
	const { runContractFunction, data, error, isLoading, isFetching } =
		useApiContract({
			address: loopAddress,
			chain: chainId ? chainId : "0x13881",
			functionName: "getData",
			abi: ABI,
		});
	const [loopData, setLoopData] = useState<any>({
		title: "",
		description: "",
		state: "",
		memberCount: 0,
		itemCount: 0,
		balance: 0,
		plan: "",
		token: "",
		lock: "",
		governor: "",
		treasury: "",
		fundraiser: "",
		actions: "",
	});

	const getLoopData = () => {
		runContractFunction()
			.then((res: any) => {
				console.log(res);
				setLoopData({
					...loopData,
					title: res[0],
					description: res[1],
					state: res[2].toUpperCase(),
					memberCount: parseInt(res[3]),
					itemCount: parseInt(res[4]),
					balance: parseInt(res[5]),
					plan: res[6],
					token: res[7],
					lock: res[8],
					governor: res[9],
					treasury: res[10],
					fundraiser: res[11],
					actions: res[12],
				});
			})
			.catch((error: any) => console.log(error));
	};

	return { getLoopData, loopData };
};

