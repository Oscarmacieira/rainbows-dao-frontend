import { useRouter } from "next/router";

export const useAppNavigation = () => {
	const router = useRouter();

	const goToProfile = (userAddress: any) => {
		router.push(userAddress);
	};

	return { goToProfile };
};
