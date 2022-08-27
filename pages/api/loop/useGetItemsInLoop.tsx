import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const useGetItemsInLoop = (loopAddress: any) => {
	const [items, setItems] = useState<any>([]);
	const { Moralis, isInitialized } = useMoralis();

	useEffect(() => {
		if (isInitialized) {
			fetchItemsInLoop();
		}
	}, [isInitialized, loopAddress]);

	const fetchItemsInLoop = async () => {
		let res = await Moralis.Cloud.run("getItemsInLoop", {
			loopAddress: loopAddress,
		});
		setItems(res);
	};

	return { items, fetchItemsInLoop };
};
