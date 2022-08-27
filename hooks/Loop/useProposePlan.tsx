import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABILoop from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { toast } from "react-toastify";

export const useProposePlan = (loopAddress: string, planAddress: string) => {
	const { chainId, Moralis } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const proposePlan = (plan, onSuccess) => {
		fetch({
			params: {
				abi: ABILoop,
				contractAddress: loopAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "proposePlan",
			},
			onError: (err: any) => {
				toast.error(`${err?.data?.message}`);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final: any) => {
						console.log(final);
						let res = await Moralis.Cloud.run("savePlanProposal", {
							proposalId: final.events[1].args[0]._hex,
							plan: plan,
							loopAddress: loopAddress,
						});
						onSuccess();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just created a new plan! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const queueApprovePlan = (onSuccess) => {
		fetch({
			params: {
				abi: ABILoop,
				contractAddress: loopAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "queueApprovePlan",
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
						success: `You just queued the plan! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const executeApprovePlan = (plan, onSuccess) => {
		fetch({
			params: {
				abi: ABILoop,
				contractAddress: loopAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "executeApprovePlan",
			},
			onError: (err: any) => {
				toast.error(`${err?.data?.message}`);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final: any) => {
						console.log(final);
						let res = await Moralis.Cloud.run("savePlanToLoop", {
							loopAddress: loopAddress,
							plan: plan,
						});
						onSuccess();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just executed the plan! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	const claimFund = (onSuccess) => {
		fetch({
			params: {
				abi: ABILoop,
				contractAddress: loopAddress,
				chain: chainId ? chainId : "0x13881",
				functionName: "claimFunds",
			},
			onError: (err: any) => {
				toast.error(`${err?.data?.message}`);
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
						success: `You just claimed the funds! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	return { proposePlan, queueApprovePlan, executeApprovePlan, claimFund };
};
