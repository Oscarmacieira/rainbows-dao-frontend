import { useEffect, useState } from "react";
import { useMoralis, useMoralisSubscription } from "react-moralis";

export const useGetAllLoops = () => {
	const [loops, setLoops] = useState<any>([]);
	const { Moralis, isInitialized } = useMoralis();

	useEffect(() => {
		if (isInitialized) {
			fetchAllLoops();
		}
		console.log("fetching All Loops");
	}, [isInitialized]);

	useMoralisSubscription("LoopCreated", (q) => q, [], {
		onCreate: (data) => fetchAllLoops(),
	});

	const fetchAllLoops = async () => {
		let res = await Moralis.Cloud.run("getAllLoops");
		setLoops(res);
	};

	return { loops, fetchAllLoops };
};
