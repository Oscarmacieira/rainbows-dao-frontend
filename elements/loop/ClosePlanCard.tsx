import { Card } from "../../components/items/card/index";
import { HR } from "../../components/items/hr/index";
import { Title } from "../../components/items/typography/Title/index";
import { NewPropoSalModal } from "./NewProposalModal";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import { useGetProposalInLoop } from "../../pages/api/loop/useGetProposalInLoop";
import { useEffect, useMemo, useState } from "react";
import { Box } from "../../components/items/box/style";
import { getShortWallet } from "../../utils/shortWallet";
import { Button } from "../../components/items/buttons/style";
import BasicModal from "../../components/items/modal/index";
import { Number } from "./style";
import { useGovernorState } from "../../hooks/Governor/useGovernorState";
import { LoopStateTag } from "../../components/core/tags/LoopStateTag";
import { useProposePlan } from "../../hooks/Loop/useProposePlan";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
	AVG_BLOCKTIME,
	VOTING_DELAY,
	VOTING_PERIOD,
} from "../../constants/constants";
export default function ClosePlanCard({
	isMember = false,
	totalMember = 2,
	loopAddress,
	governorAddress,
	tokenAddress,
	planAddress,
	plan,
	refreshLoopData,
	totalLoopMember,
}) {
	const { account } = useMoralis();
	const { proposals, fetchProposalInLoop } = useGetProposalInLoop(loopAddress);

	useMoralisSubscription(
		"PlanProposal",
		(q) => q.matches("loop", loopAddress, "i"),
		[],
		{
			onCreate: (data) => {
				fetchProposalInLoop();
			},
			onUpdate: (data) => {
				fetchProposalInLoop();
			},
		}
	);

	function planTotalBudget(array) {
		let total = 0;
		for (let elem of array) {
			total += elem?.budget;
		}
		return total;
	}

	return (
		<Card fg2>
			<div className="flex align-items-center justify-space-between">
				<Title maj medium className="text-center">
					Close the plan{" "}
				</Title>{" "}
			</div>
			<HR width={"100%"} height="1px" className="mb-3" />
			{isMember && account && proposals?.length === 0 && (
				<NewPropoSalModal
					loopAddress={loopAddress}
					planAddress={planAddress}
					tokenAddress={tokenAddress}
					refreshProposal={() => fetchProposalInLoop()}
					plan={plan}
				/>
			)}
			{proposals.map((proposal, index) => (
				<Box fg1 className="my-3" key={`proposal-${index}`}>
					<div className="flex align-items-center justify-space-between max-width">
						<Title small>Proposal #{getShortWallet(proposal?.id)}</Title>
						<BasicModal
							isConfirmButton={false}
							cancelButtonText={"Close"}
							title={`Budget: ${planTotalBudget(proposal?.plan)} $UNIT`}
							opener={<Button outline>Read plan</Button>}
						>
							{proposal?.plan?.map((item, idx) => (
								<div
									key={`item-proposal-${idx}`}
									className="flex max-width my-3"
								>
									<div>
										<Number>{idx + 1}</Number>
										<div
											className="fit-content primary"
											style={{ height: "60%", width: 1, marginInline: "auto" }}
										/>
									</div>
									<div className="max-width flex-column  ml-3" style={{}}>
										<Title small>{item?.title}</Title>
										<p>{item?.description}</p>
										<p>
											Budget: <b>{item?.budget} $UNIT</b>
										</p>
									</div>
								</div>
							))}{" "}
						</BasicModal>{" "}
					</div>{" "}
					<HR width={"100%"} className="primary my-3" height={"1px"} />
					<ProposalBoxAction
						refreshLoopData={() => refreshLoopData()}
						isMember={isMember}
						proposalId={proposal?.id}
						governorAddress={governorAddress}
						loopAddress={loopAddress}
						planAddress={planAddress}
						plan={plan}
						proposal={proposal}
						totalMember={totalLoopMember}
						fetchProposalInLoop={() => fetchProposalInLoop()}
					/>
				</Box>
			))}
		</Card>
	);
}

const ProposalBoxAction = ({
	proposalId,
	governorAddress,
	loopAddress,
	planAddress,
	isMember,
	refreshLoopData,
	plan,
	proposal,
	totalMember,
	fetchProposalInLoop,
}) => {
	const { isInitialized, account, user } = useMoralis();
	const { governorState, getGovernorState, castVote } = useGovernorState(
		loopAddress,
		planAddress
	);

	const { queueApprovePlan, executeApprovePlan } = useProposePlan(
		loopAddress,
		planAddress
	);
	function refreshState() {
		getGovernorState(governorAddress, proposalId);
	}

	useMoralisSubscription(
		"PlanProposal",
		(q) => q.matches("proposalId", proposalId, "i"),
		[],
		{
			onCreate: (data) => {
				refreshLoopData();
				refreshState();
			},
			onUpdate: (data) => {
				refreshLoopData();
				refreshState();
			},
		}
	);

	function getNameState(state) {
		let val = "PENDING";
		switch (state) {
			case 0:
				val = "PENDING";
				break;
			case 1:
				val = "ACTIVE";
				break;
			case 2:
				val = "CANCELED";
				break;
			case 3:
				val = "DEFEATED";
				break;
			case 4:
				val = "SUCCEEDED";
				break;
			case 5:
				val = "QUEUED";
				break;
			case 6:
				val = "EXPIRED";
				break;
			case 7:
				val = "EXECUTED";
				break;

			default:
				break;
		}
		return val;
	}

	useEffect(() => {
		if (isInitialized) {
			refreshState();
		}
	}, [isInitialized]);

	const createdAt = new Date(proposal?.createdAt);
	const startDate = new Date(
		createdAt.getTime() + AVG_BLOCKTIME["0x13881"] * VOTING_DELAY
	);
	const endDate = new Date(
		startDate.getTime() + AVG_BLOCKTIME["0x13881"] * VOTING_PERIOD
	);
	const now = new Date();

	const [diff, setDiff] = useState<any>({});
	const futureDate = endDate;
	const getDateDiff = (date1, date2) => {
		const diff = new Date(date2.getTime() - date1.getTime());
		return {
			year: diff.getUTCFullYear() - 1970,
			month: diff.getUTCMonth(),
			day: diff.getUTCDate() - 1,
			hour: diff.getUTCHours(),
			minute: diff.getUTCMinutes(),
			second: diff.getUTCSeconds(),
		};
	};

	const formatDate = (date) => {
		let d = new Date(date),
			month = (d.getMonth() + 1).toString(),
			day = d.getDate().toString(),
			year = d.getFullYear().toString();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setDiff(getDateDiff(new Date(), endDate));
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	return (
		<>
			<div className="flex align-items-center max-width justify-space-between">
				<div className="flex align-items-center" style={{ gap: 20 }}>
					{governorState !== 7 && governorState !== 3 && (
						<RefreshIcon className="hover-btn" onClick={() => refreshState()} />
					)}{" "}
					<LoopStateTag state={governorState}>
						{getNameState(governorState)}
					</LoopStateTag>
				</div>{" "}
				{isMember && account && (
					<>
						{governorState === 1 && (
							<div className="flex align-items-center" style={{ gap: 20 }}>
								<Button
									disabled={proposal?.votes?.includes(user?.get("ethAddress"))}
									onClick={() =>
										castVote(governorAddress, proposalId, 1, () => {
											fetchProposalInLoop();
										})
									}
								>
									{proposal?.votes?.includes(user?.get("ethAddress"))
										? "Already voted!"
										: "Vote for this plan"}{" "}
								</Button>

								<b>
									{proposal?.votes?.length}/{totalMember}{" "}
									{totalMember === 1 ? "vote " : "votes "}needed
								</b>
							</div>
						)}{" "}
						{governorState === 4 && (
							<Button
								onClick={() =>
									queueApprovePlan(proposalId, () => refreshState())
								}
							>
								Queue this plan{" "}
							</Button>
						)}{" "}
						{governorState === 5 && (
							<Button
								onClick={() =>
									executeApprovePlan(plan, proposalId, () => {
										refreshState();
										refreshLoopData();
									})
								}
							>
								Execute this plan{" "}
							</Button>
						)}
					</>
				)}{" "}
				{/*  
	{now?.getTime() < endDate?.getTime() &&
					(governorState === 0 || governorState === 1) && (
						<Title small>
							{now?.getTime() <= startDate?.getTime()
								? "Vote starts"
								: "Ending"}{" "}
							in {diff?.day}d : {diff?.hour}h : {diff?.minute}min :{" "}
							{diff?.second}
							sec
						</Title>
					)}

					*/}{" "}
			</div>
		</>
	);
};
