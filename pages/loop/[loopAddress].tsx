import Head from "next/head";
import { Container } from "../../components/layout/Container/style";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import { OneThirdTwoThird } from "../../components/items/grid/style";
import { useRouter } from "../../node_modules/next/router";
import ContractsCard from "../../elements/loop/ContractsCard";
import { Title } from "../../components/items/typography/Title/index";
import { Card } from "../../components/items/card/index";
import { HR } from "../../components/items/hr/index";
import { Button } from "../../components/items/buttons/style";
import DetailsCard from "../../elements/loop/DetailsCard";
import PlanCard from "../../elements/loop/PlanCard";
import FundraisingCard from "../../elements/loop/FundraisingCard";
import ActionsCard from "../../elements/loop/ActionsCard";
import { useLoopData } from "../../hooks/Loop/useLoopData";
import { useEffect, useState } from "react";
import { useIsMember } from "../../hooks/Loop/useLoopContracts";
import ClosePlanCard from "../../elements/loop/ClosePlanCard";
import { useGetItemsInLoop } from "../api/loop/useGetItemsInLoop";
import { useGetLoopPlan } from "../api/loop/useGetLoopPlan";
export default function Loop() {
	const router = useRouter();
	const { loopAddress } = router.query;
	const {
		user,
		account,
		isInitialized,
		isWeb3Enabled,
		enableWeb3,
		isAuthenticated,
		isWeb3EnableLoading,
	} = useMoralis();
	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);

	const { getLoopData, loopData } = useLoopData(loopAddress);
	const { items, fetchItemsInLoop } = useGetItemsInLoop(loopAddress);
	const { plan, fetchLoopPlan } = useGetLoopPlan(loopAddress);

	const { isMember, getIsMember } = useIsMember(
		loopAddress,
		user?.get("ethAddress")
	);

	useEffect(() => {
		getLoopData();
	}, [loopAddress]);

	useEffect(() => {
		getIsMember();
	}, [user, loopAddress]);

	useEffect(() => {
		if (isInitialized) {
			fetchItemsInLoop();
			fetchLoopPlan();
			console.log("running");
			console.log(plan);
		}
	}, [isInitialized, loopData]);

	const [displayed, setDisplayed] = useState(items);
	useEffect(() => {
		if (loopData?.state === "PLANNING") setDisplayed(items);
		else setDisplayed(plan);
	}, [loopData, items, plan]);

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
						<DetailsCard
							isMember={isMember}
							title={loopData?.title}
							description={loopData?.description}
							state={loopData?.state}
							memberCount={loopData?.memberCount}
							balance={loopData?.balance}
							loopAddress={loopAddress}
							refreshLoopData={() => getLoopData()}
							refreshMembership={() => getIsMember()}
						/>
						<ContractsCard
							plan={loopData?.plan}
							loopAddress={loopAddress}
							token={loopData?.token}
							governor={loopData?.governor}
							treasury={loopData?.treasury}
							fundraiser={loopData?.fundraiser}
							actions={loopData?.actions}
						/>
					</div>{" "}
					<div className="div2">
						<PlanCard
							refreshLoopData={() => getLoopData()}
							items={items}
							actionAddress={loopData?.actions}
							refreshItems={() => fetchItemsInLoop()}
							refreshPlan={() => fetchLoopPlan()}
							isMember={isMember}
							loopAddress={loopAddress}
							planAddress={loopData?.plan}
							loopState={loopData?.state}
							plan={plan}
							display={displayed}
						/>
						{isMember && loopData?.state === "PLANNING" && items?.length > 0 && (
							<>
								<ClosePlanCard
									totalLoopMember={loopData?.memberCount}
									planAddress={loopData?.plan}
									loopAddress={loopAddress}
									governorAddress={loopData?.governor}
									tokenAddress={loopData?.token}
									isMember={isMember}
									plan={items}
									refreshLoopData={() => getLoopData()}
								/>
							</>
						)}
						{loopData?.state === "FUNDRAISING" && (
							<FundraisingCard
								isMember={isMember}
								plan={plan}
								fundraiserAddress={loopData?.fundraiser}
								loopAddress={loopAddress}
								planAddress={loopData?.plan}
								refreshData={() => getLoopData()}
							/>
						)}{" "}
					</div>
				</OneThirdTwoThird>
			</Container>
		</div>
	);
}
