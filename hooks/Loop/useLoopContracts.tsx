import { useContext, useEffect, useState } from "react";
import {
	useMoralisWeb3Api,
	useMoralisWeb3ApiCall,
	useApiContract,
	useWeb3Contract,
	useMoralis,
} from "react-moralis";
import UnitTokenAbi from "../../constants/abi/contracts/UnitToken.sol/UnitToken.json";
import contracts from "../../constants/contractAddresses.json";
import ABI from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { UserContext } from "../../contexts/UserContextProvider";

export const useIsMember = (loopAddress: any, userAddress: any) => {
	const { native } = useMoralisWeb3Api();

	const { Moralis, chainId, user } = useMoralis();

	const options: {
		chain: string;
		address: string;
		function_name: string;
		abi: object[];
		params: {};
	} = {
		address: loopAddress,

		chain: "0x13881",
		function_name: "isMember",
		abi: ABI,
		params: { account: userAddress },
	};
	const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
		native.runContractFunction,
		{ ...options }
	);
	const [isMember, setIsMember] = useState(false);

	const getIsMember = () => {
		fetch()
			.then((res: any) => {
				console.log(res);
				setIsMember(res);
			})
			.catch((error: any) => setIsMember(false));
	};

	return { isMember, getIsMember };
};
