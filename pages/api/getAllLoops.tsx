import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const getAllLoops = () => {
	const [loops, setLoops] = useState<any>([]);
	const { Moralis, isInitialized } = useMoralis();

	useEffect(() => {
		if (isInitialized) {
			fetchAllLoops();
		}
		console.log("fetching All Loops");
	}, [isInitialized]);

	const fetchAllLoops = async () => {
		let res = await Moralis.Cloud.run("getAllLoops");
		setLoops(res);
	};

	return { loops, fetchAllLoops };
};
