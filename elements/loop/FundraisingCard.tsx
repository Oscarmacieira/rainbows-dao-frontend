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
import { useEffect } from "react";
import { PledgeModal } from "./PledgeModal";
import { useMoralis } from "react-moralis";
import { useProposePlan } from "../../hooks/Loop/useProposePlan";
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

	return (
		<Card fg2>
			<div className="flex align-items-center justify-space-between">
				<Title maj medium className="text-center">
					Fundraising
				</Title>
			</div>
			<HR width={"100%"} height="1px" className="mb-3" />
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
			<br />
			<div className="flex align-items-center justify-space-between">
				{user && (
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
			</div>
		</Card>
	);
}
