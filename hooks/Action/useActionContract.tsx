import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Actions.sol/Actions.json";
import ABILoop from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { toast } from "react-toastify";
import { ZERO_ADDRESS } from "../../constants/constants";

export const useActionContract = (actionAddress: string) => {
	const { chainId, Moralis } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();
	const [actionData, setActionData] = useState({
		createdBy: "",
		executed: false,
		exists: false,
		cost: 0,
		paid: false,
		payee: "",
		title: "",
		validatedBy: ZERO_ADDRESS,
	});

	const getAction = (itemId, actionId) => {
		console.log(itemId);
		fetch({
			params: {
				abi: ABI,
				contractAddress: actionAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "getAction",
				params: {
					itemId: itemId,
					id: actionId,
				},
			},
			onError: (err: any) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				setActionData({
					...actionData,
					createdBy: tx?.createdBy,
					executed: tx?.executed,
					exists: tx?.exists,
					paid: tx?.paid,
					payee: tx?.payee,
					title: tx?.title,
					validatedBy: tx?.validatedBy,
					cost: parseInt(tx?.cost?._hex),
				});
				console.log(actionData);
			},
		});
	};

	const createAction = (action, onSuccess) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: actionAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "createAction",
				params: {
					itemId: action?.itemId,
					_title: action.title,
					_cost: action.cost,
					_payee: action.payee,
				},
			},
			onError: (err: any) => {
				toast.error(`${err?.data?.message}`);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final: any) => {
						console.log(final);
						let res = await Moralis.Cloud.run("saveNewAction", {
							action: action,
						});

						onSuccess();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just created an action! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const validateAction = (itemId, actionId, onSuccess) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: actionAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "validateAction",
				params: {
					itemId: itemId,
					id: actionId,
				},
			},
			onError: (err: any) => {
				toast.error(`${err?.data?.message}`);
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
						success: `You just validated an action! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const executeAction = (itemId, actionId, onSuccess) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: actionAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "executeAction",
				params: {
					itemId: itemId,
					id: actionId,
				},
			},
			onError: (err: any) => {
				toast.error(`${err?.data?.message}`);
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
						success: `You just executed an action! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const payAction = (itemId, actionId, loopAddress, onSuccess) => {
		fetch({
			params: {
				abi: ABILoop,
				contractAddress: loopAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "payAction",
				params: {
					itemId: itemId,
					id: actionId,
				},
			},
			onError: (err: any) => {
				toast.error(`${err?.data?.message}`);
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
						success: `You just paid an action! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	return {
		getAction,
		actionData,
		createAction,
		validateAction,
		executeAction,
		payAction,
	};
};
