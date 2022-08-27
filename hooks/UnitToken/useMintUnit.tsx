import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import UnitTokenABI from "../../constants/abi/contracts/UnitToken.sol/UnitToken.json";
import contracts from "../../constants/contractAddresses.json";
import { toast } from "react-toastify";
import { useUnitBalance } from "./useUnitBalance";

export const useMintUnit = ({ amount = 2000 }) => {
	const { chainId } = useMoralis();
	const { data, error, fetch, isFetching, isLoading } =
		useWeb3ExecuteFunction();
	const { getUnitBalance } = useUnitBalance();
	const options: any = {
		abi: UnitTokenABI,
		contractAddress: contracts[chainId]?.unit,
		functionName: "mint",
		params: { amount: amount },
	};
	const mintUnitToken = () => {
		fetch({
			params: options,
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then((final) => {
						console.log(final);
						getUnitBalance();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just received ${amount} $UNIT 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	return { mintUnitToken };
};
