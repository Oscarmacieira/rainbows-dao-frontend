import { useContext, useEffect, useState } from "react";
import { useApiContract, useMoralis } from "react-moralis";
import UnitTokenAbi from "../../constants/abi/contracts/UnitToken.sol/UnitToken.json";
import contracts from "../../constants/contractAddresses.json";
import { UserContext } from "../../contexts/UserContextProvider";

export const useUnitBalance = () => {
	const unitABI = [
		{
			inputs: [{ internalType: "address", name: "account", type: "address" }],
			name: "balanceOf",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
	];

	const { Moralis, chainId, user } = useMoralis();
	const { setUnitBalance, userDetail } = useContext(UserContext);
	const { runContractFunction, data, error, isLoading, isFetching } =
		useApiContract({
			address: contracts[chainId]?.unit,
			chain: chainId,
			functionName: "balanceOf",
			abi: UnitTokenAbi,
			params: { account: user?.get("ethAddress") },
		});

	const getUnitBalance = () => {
		runContractFunction()
			.then((res: any) => {
				console.log(res);
				if (res) {
					console.log(`THE BALANCE: ${parseInt(res)}`);
					setUnitBalance(parseInt(res));
				}
			})
			.catch((error: any) => console.log(error));
	};

	return { getUnitBalance };
};
