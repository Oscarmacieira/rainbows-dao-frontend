import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/GovernorContract.sol/GovernorContract.json";
import { toast } from "react-toastify";

export const useGovernorState = (loopAddress: string, planAddress: string) => {
	const { chainId, Moralis } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();
	const [governorState, setGovernorState] = useState(0);

	const getGovernorState = (governorAddress, proposalId) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: governorAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "state",
				params: {
					proposalId: proposalId,
				},
			},
			onError: (err: any) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				setGovernorState(parseInt(tx));
			},
		});
	};

	const castVote = (governorAddress, proposalId, support, onSuccess) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: governorAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "castVote",
				params: {
					proposalId: proposalId,
					support: support,
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
						success: `You just voted for this plan! 👌`,
						error: "Promise rejected 🤯",
					}
				);

				onSuccess();
			},
		});
	};

	return { governorState, getGovernorState, castVote };
};