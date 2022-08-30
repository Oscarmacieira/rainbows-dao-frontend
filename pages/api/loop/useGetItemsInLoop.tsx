import { useEffect, useState } from "react";
import { useMoralis, useMoralisSubscription } from "react-moralis";

export const useGetItemsInLoop = (loopAddress: any) => {
	const [items, setItems] = useState<any>([]);
	const { Moralis, isInitialized } = useMoralis();

	useEffect(() => {
		if (isInitialized) {
			fetchItemsInLoop();
		}
	}, [isInitialized, loopAddress]);

	useMoralisSubscription(
		"Item",
		(q) => q.matches("loop", loopAddress, "i"),
		[],
		{
			onCreate: (data) => fetchItemsInLoop(),
			onDelete: (data) => fetchItemsInLoop(),
		}
	);

	const fetchItemsInLoop = async () => {
		let res = await Moralis.Cloud.run("getItemsInLoop", {
			loopAddress: loopAddress,
		});
		setItems(res);
	};

	return { items, fetchItemsInLoop };
};
