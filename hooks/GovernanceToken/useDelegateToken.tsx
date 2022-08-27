import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/GovernanceToken.sol/GovernanceToken.json";
import { toast } from "react-toastify";

export const useDelegateToken = (loopAddress: string, tokenAddress: string) => {
	const { chainId, Moralis, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();
	const [delegateAddress, setDelegateAddress] = useState("");

	const delegate = (onSuccess) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: tokenAddress,
				functionName: "delegate",
				params: {
					delegatee: user?.get("ethAddress"),
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
						success: `You just delegate to your account! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const delegates = async (onSuccess) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: tokenAddress,
				functionName: "delegates",
				params: {
					account: user?.get("ethAddress"),
				},
			},
			onError: (err: any) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				setDelegateAddress(tx);
				onSuccess();
			},
		});
	};

	return { delegate, delegates, delegateAddress };
};
