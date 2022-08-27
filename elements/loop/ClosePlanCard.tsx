import { Card } from "../../components/items/card/index";
import { HR } from "../../components/items/hr/index";
import { Title } from "../../components/items/typography/Title/index";
import { NewPropoSalModal } from "./NewProposalModal";
import { useMoralis } from "react-moralis";
import { getProposalInLoop } from "../../pages/api/loop/getProposalInLoop";
import { useEffect, useMemo } from "react";
import { Box } from "../../components/items/box/style";
import { getShortWallet } from "../../utils/shortWallet";
import { Button } from "../../components/items/buttons/style";
import BasicModal from "../../components/items/modal/index";
import { Number } from "./style";
import { useGovernorState } from "../../hooks/Governor/useGovernorState";
import { LoopStateTag } from "../../components/core/tags/LoopStateTag";
import { useProposePlan } from "../../hooks/Loop/useProposePlan";
export default function ClosePlanCard({
	isMember = false,
	loopAddress,
	governorAddress,
	tokenAddress,
	planAddress,
	plan,
	refreshLoopData,
}) {
	const { account } = useMoralis();
	const { proposals, fetchProposalInLoop } = getProposalInLoop(loopAddress);

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
}) => {
	const { isInitialized, account } = useMoralis();
	const { governorState, getGovernorState, castVote } = useGovernorState(
		loopAddress,
		planAddress
	);

	const { queueApprovePlan, executeApprovePlan } = useProposePlan(
		loopAddress,
		planAddress
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

	function refreshState() {
		getGovernorState(governorAddress, proposalId);
	}

	useEffect(() => {
		if (isInitialized) {
			refreshState();
		}
	}, [isInitialized]);
	return (
		<>
			<div className="flex align-items-center" style={{ gap: 20 }}>
				<LoopStateTag state={governorState}>
					{getNameState(governorState)}
				</LoopStateTag>
				{governorState !== 7 && governorState !== 3 && (
					<Button onClick={() => refreshState()} text>
						Refresh state
					</Button>
				)}{" "}
			</div>
			{isMember && account && (
				<>
					{governorState === 1 && (
						<Button
							onClick={() => castVote(governorAddress, proposalId, 1, () => {})}
						>
							Vote for this plan
						</Button>
					)}{" "}
					{governorState === 4 && (
						<Button onClick={() => queueApprovePlan(() => refreshState())}>
							Queue this plan{" "}
						</Button>
					)}{" "}
					{governorState === 5 && (
						<Button
							onClick={() =>
								executeApprovePlan(plan, () => {
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
		</>
	);
};
