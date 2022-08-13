import { useRouter } from "next/router";

export const useAppNavigation = () => {
	const router = useRouter();

	const goToProfile = (userAddress: any) => {
		router.push(userAddress);
	};

	const goToNewLoop = () => {
		return "new-loop";
	};

	return { goToProfile, goToNewLoop };
};
