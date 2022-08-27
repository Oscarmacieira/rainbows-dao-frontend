import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const useGetProposalInLoop = (loopAddress: any) => {
	const [proposals, setProposal] = useState<any>([]);
	const { Moralis, isInitialized } = useMoralis();

	useEffect(() => {
		if (isInitialized) {
			fetchProposalInLoop();
		}
	}, [isInitialized, loopAddress]);

	const fetchProposalInLoop = async () => {
		let res = await Moralis.Cloud.run("getProposalInLoop", {
			loopAddress: loopAddress,
		});
		setProposal(res);
	};

	return { proposals, fetchProposalInLoop };
};
