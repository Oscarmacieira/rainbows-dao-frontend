import { Card } from "../../components/items/card/index";
import { HR } from "../../components/items/hr/index";
import { Title } from "../../components/items/typography/Title/index";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Tag } from "../../components/core/tags/index";
import { Button } from "../../components/items/buttons/style";
import { Number } from "./style";
import BasicModal from "../../components/items/modal/index";
import { Input } from "../../components/items/input/index";
import { TextArea } from "../../components/items/textarea/index";
import { CreateItem } from "./CreateItem";
import { DeleteItem } from "./DeleteItem";
import { ProgressBar } from "../../components/items/progressBar/index";
import { useCrowdFund } from "../../hooks/CrowdFund/useCrowndFund";
import { useEffect, useState } from "react";
import { PledgeModal } from "./PledgeModal";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import { useProposePlan } from "../../hooks/Loop/useProposePlan";
import Countdown from "react-countdown";
import { LoopStateTag } from "../../components/core/tags/LoopStateTag";
export default function FundraisingCard({
	isMember = false,
	plan,
	fundraiserAddress,
	loopAddress,
	planAddress,
	refreshData,
}) {
	function goal() {
		let total = 0;
		for (let item of plan) {
			total += item?.budget;
		}
		return total;
	}
	const { user } = useMoralis();
	const { getCampaignPledge, campaignPledge } = useCrowdFund(
		loopAddress,
		fundraiserAddress
	);

	const { claimFund } = useProposePlan(loopAddress, planAddress);

	useEffect(() => {
		getCampaignPledge();
	}, [loopAddress]);

	const endDate = new Date(campaignPledge?.endAt * 1000);
	const startDate = new Date(campaignPledge?.startAt * 1000);
	const now = new Date();

	const [diff, setDiff] = useState<any>({});
	const [init, setInit] = useState<any>();

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

	useMoralisSubscription(
		"EventPledge",
		(q) => q.matches("fundraiserAddress", fundraiserAddress, "i"),
		[],
		{
			onCreate: (data) => getCampaignPledge(),
			onUpdate: (data) => getCampaignPledge(),
		}
	);

	useMoralisSubscription(
		"EventClaimFund",
		(q) => q.matches("loopAddress", loopAddress, "i"),
		[],
		{
			onCreate: (data) => refreshData(),
		}
	);

	return (
		<Card fg2>
			<div className="flex align-items-center justify-space-between">
				<Title maj medium className="text-center">
					Fundraising
				</Title>
				{now?.getTime() < startDate?.getTime() && (
					<Tag state="PLANNING">OPENING SOON</Tag>
				)}
				{now?.getTime() < endDate?.getTime() &&
					now?.getTime() > startDate?.getTime() && (
						<Tag state="IMPLEMENTING">OPEN</Tag>
					)}
				{now?.getTime() >= endDate?.getTime() && (
					<Tag state="FUNDRAISING">CLOSED</Tag>
				)}
			</div>
			<HR width={"100%"} height="1px" className="mb-3" />
			{/*  

		{now?.getTime() < endDate?.getTime() && (
				<Title small>
					Ending in {diff?.day}d : {diff?.hour}h : {diff?.minute}min :{" "}
					{diff?.second}
					sec
				</Title>
			)}{" "}

			*/}
			{now?.getTime() >= startDate?.getTime() && (
				<>
					{" "}
					<ProgressBar
						value={(campaignPledge?.pledged / campaignPledge?.goal) * 100}
					/>
					<div className="max-width justify-space-between flex align-items-center">
						<Title small>
							<u>Current value:</u>
							<br />
							{campaignPledge?.pledged} $UNIT
						</Title>

						<Title small>
							<u>Goal:</u>
							<br />
							{campaignPledge?.goal} $UNIT
						</Title>
					</div>
				</>
			)}
			<br />
			<div className="flex align-items-center justify-space-between">
				{user &&
					now.getTime() >= startDate.getTime() &&
					now.getTime() < endDate.getTime() && (
						<PledgeModal
							loopAddress={loopAddress}
							fundraiserAddress={fundraiserAddress}
							campaign={campaignPledge}
							refreshCampaign={() => getCampaignPledge()}
						/>
					)}{" "}
				{campaignPledge?.pledged === campaignPledge?.goal &&
					isMember &&
					user && (
						<Button
							onClick={() => {
								claimFund(() => {
									refreshData();
								});
							}}
							outline
						>
							Claim Funds
						</Button>
					)}{" "}
				{now?.getTime() > endDate?.getTime() && (
					<LoopStateTag
						state={campaignPledge?.pledged >= campaignPledge?.goal ? 4 : 3}
					>
						{campaignPledge?.pledged === campaignPledge?.goal
							? "SUCCESSED"
							: "FAILED"}
					</LoopStateTag>
				)}{" "}
			</div>
		</Card>
	);
}
