import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Plan.sol/Plan.json";
import { toast } from "react-toastify";

export const useAddAndRemoveItem = (
	loopAddress: string,
	planAddress: string
) => {
	const { chainId, Moralis } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const addItem = ({ title, description, budget, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: planAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "addItem",
				params: {
					title: title,
					description: description,
					budget: budget,
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
						await Moralis.Cloud.run("saveNewItem", {
							item: {
								id: final.events[0].args[0]._hex,
								title: title,
								description: description,
								budget: budget,
							},
							loopAddress: loopAddress,
						});
						onSuccess();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just created a new item! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const removeItem = ({ itemId, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: planAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "removeItem",
				params: {
					id: itemId,
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
						await Moralis.Cloud.run("deleteItem", {
							itemId: itemId,
						});
						onSuccess();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just deleted an item! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const itemHash = ({ title, description, budget, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: planAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "itemHash",
				params: {
					title: title,
					description: description,
					budget: budget,
				},
			},
			onError: (err: any) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				onSuccess();
			},
		});
	};

	return { addItem, removeItem, itemHash };
};
