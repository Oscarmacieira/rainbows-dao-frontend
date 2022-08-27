import { useRouter } from "next/router";

export const useAppNavigation = () => {
	const router = useRouter();

	const goToProfile = (userAddress: any) => {
		return `/${userAddress}`;
	};

	const goToNewLoop = () => {
		return "/new-loop";
	};

	const goToLoop = (loopAddress: string) => {
		router.push(`/loop/${loopAddress}`);
	};

	return { goToProfile, goToNewLoop, goToLoop };
};
