import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/UnitToken.sol/UnitToken.json";
import { toast } from "react-toastify";
import contracts from "../../constants/contractAddresses.json";

export const useUnitAllowance = (fundraiserAddress: string) => {
	const { chainId, Moralis, enableWeb3, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const [allowance, setAllowance] = useState(0);

	const getAllowance = () => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: contracts["0x13881"]?.unit,
				chain: chainId ? chainId : "0x13881",
				functionName: "allowance",
				params: {
					owner: user?.get("ethAddress"),
					spender: fundraiserAddress,
				},
			},
			onError: (err: any) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				setAllowance(parseInt(tx?._hex));
			},
		});
	};

	const approve = (amount, onSuccess) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: contracts["0x13881"]?.unit,
				chain: chainId ? chainId : "0x13881",
				functionName: "approve",
				params: {
					spender: fundraiserAddress,
					amount: amount,
				},
			},
			onError: (err: any) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final: any) => {
						console.log(final);
						onSuccess();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just approved the contracts to spend ${amount} $UNIT! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	return { getAllowance, allowance, approve };
};
