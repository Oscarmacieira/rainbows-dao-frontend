import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Loop.sol/Loop.json";
import contracts from "../../constants/contractAddresses.json";
import { toast } from "react-toastify";

export const useJoinAndLeaveLoop = (loopAddress: any, onSuccess = () => {}) => {
	const { chainId, user } = useMoralis();
	const { data, error, fetch, isFetching, isLoading } =
		useWeb3ExecuteFunction();

	const joinLoop = () => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "join",
			},
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then((final) => {
						console.log(final);
						onSuccess();
						user?.addUnique("memberIn", loopAddress);
						user?.save();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just join this loop 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const leaveLoop = () => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "leave",
			},

			onError: (err) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then((final) => {
						console.log(final);
						onSuccess();
						user?.remove("memberIn", loopAddress);
						user?.save();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just leaved this loop 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	return { joinLoop, leaveLoop };
};
