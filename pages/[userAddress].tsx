import Head from "next/head";
import ParticleAnimation from "../components/animation/particle/index";
import LoopCard from "../components/core/loopcard/index";
import { HR } from "../components/items/hr/index";
import { Title } from "../components/items/typography/Title/index";
import { Container } from "../components/layout/Container/style";
import { useRouter } from "next/router";
import { Box } from "../components/items/box/style";
import { UserBox } from "../elements/[userAddress]/UserBox";
import { useMoralis } from "react-moralis";
import { OneThirdTwoThird } from "../components/items/grid/style";
import { useContext, useEffect, useMemo, useState } from "react";
import { getShortWallet } from "../utils/shortWallet";
import { UserContext } from "../contexts/UserContextProvider";
import { useUserData } from "../hooks/User/useUserData";
import { PaginationStyled } from "../components/items/pagination/style";
export default function User() {
	const router = useRouter();
	const { userAddress } = router.query;
	const { user, refetchUserData, account } = useMoralis();
	const { userDetail, editAbout, editAvatar, editUsername, getUserDetail } =
		useContext(UserContext);

	const [isUser, setIsUser] = useState<any>(
		userAddress === user?.get("ethAddress") && account
	);

	const { fetchUserData, userData } = useUserData({ userAddress: userAddress });

	useEffect(() => {
		if (!isUser) {
			fetchUserData();
		} else {
			getUserDetail();
		}
	}, [userAddress]);

	useEffect(() => {
		setIsUser(userAddress === user?.get("ethAddress") && account);
	}, [user, userAddress]);

	const [page, setPage] = useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	};

	const getCurrentLoops = () => {
		const start = (page - 1) * 4;
		const end = start + 4;

		if (isUser) {
			return userDetail?.memberIn.slice(start, end);
		}
		return userData?.memberIn.slice(start, end);
	};

	const pager = (
		<PaginationStyled
			count={Math.ceil(
				isUser ? userDetail?.memberIn.length / 4 : userData?.memberIn.length / 4
			)}
			defaultPage={1}
			onChange={(e, value) => handleChange(e, value)}
			page={page}
		/>
	);

	return (
		<div>
			<Head>
				<title>Rainbows DAO</title>
				<meta
					name="description"
					content="Because technology rythm with virtuosity "
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<OneThirdTwoThird>
					<div className="div1">
						<UserBox
							isUser={isUser}
							address={getShortWallet(
								isUser ? userDetail?.wallet : userData?.wallet
							)}
							description={isUser ? userDetail?.about : userData?.about}
							imgSrc={isUser ? userDetail.avatar : userData?.avatar}
							username={isUser ? userDetail?.username : userData?.username}
							refrechData={() => getUserDetail()}
						/>
					</div>{" "}
					<div className="div2">
						<div className="flex maw-width align-items-center justify-space-between">
							<Title maj medium className="mb-3">
								{isUser ? "My" : userData?.username} LOOPS
							</Title>
							{pager}
						</div>
						{isUser && <LoopCard className="my-2" newLoop={true} />}
						{getCurrentLoops()?.map((loop, index) => (
							<LoopCard
								className="my-2"
								loopAddress={loop}
								key={`loop-${index}`}
							/>
						))}{" "}
						{pager}
					</div>
				</OneThirdTwoThird>
			</Container>
		</div>
	);
}
