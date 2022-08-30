import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/CrowdFund.sol/CrowdFund.json";
import { toast } from "react-toastify";

export const useCrowdFund = (
	loopAddress: string,
	fundraiserAddress: string
) => {
	const { chainId, Moralis, enableWeb3, user } = useMoralis();

	const { fetch } = useWeb3ExecuteFunction();
	const [campaignPledge, setCampaignPledge] = useState({
		pledged: 0,
		goal: 0,
		creator: "",
		startAt: 0,
		endAt: 0,
		claimed: false,
	});

	const getCampaignPledge = async () => {
		//	const web3 = await Moralis?.enableWeb3();
		fetch({
			params: {
				abi: ABI,
				contractAddress: fundraiserAddress,
				functionName: "campaigns",
				params: {
					"": 1,
				},
			},
			onError: (err: any) => {
				console.log(err);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				setCampaignPledge({
					...campaignPledge,
					goal: parseInt(tx?.goal?._hex, 16),
					creator: tx?.creator,
					pledged: parseInt(tx?.pledged?._hex, 16),
					startAt: tx?.startAt,
					endAt: tx?.endAt,
					claimed: tx?.claimed,
				});
			},
		});
	};

	const pledge = async (amount, onSuccess) => {
		const web3 = await Moralis.enableWeb3();
		fetch({
			params: {
				abi: ABI,
				contractAddress: fundraiserAddress,
				functionName: "pledge",
				params: {
					_id: 1,
					_amount: amount,
				},
			},
			onError: (err: any) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx: any) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final: any) => {
						console.log(final);
						await Moralis.Cloud.run("saveNewPledge", {
							amount: amount,
							loopAddress: loopAddress,
							fundraiserAddress: fundraiserAddress,
							userAddress: user?.get("ethAddress"),
						});
						onSuccess();
					}),

					{
						pending: `Waiting for ${tx?.hash} to be validated`,
						success: `You just pledged ${amount} $UNIT ! 👌`,
						error: "Promise rejected 🤯",
					}
				);
			},
		});
	};

	return { campaignPledge, getCampaignPledge, pledge };
};
