import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const useGetLoopPlan = (loopAddress: any) => {
	const [plan, setPlan] = useState<any>([]);
	const { Moralis, isInitialized } = useMoralis();

	useEffect(() => {
		if (isInitialized) {
			fetchLoopPlan();
		}
	}, [isInitialized, loopAddress]);

	const fetchLoopPlan = async () => {
		let res = await Moralis.Cloud.run("getLoopPlan", {
			loopAddress: loopAddress,
		});
	//	console.log(JSON.stringify(res, null, 4));
		setPlan(res);
	};

	return { plan, fetchLoopPlan };
};
