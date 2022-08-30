import { Card } from "../../components/items/card/index";
import { HR } from "../../components/items/hr/index";
import { Title } from "../../components/items/typography/Title/index";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Tag } from "../../components/core/tags/index";
import { Button } from "../../components/items/buttons/style";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import { useJoinAndLeaveLoop } from "../../hooks/Loop/useJoinLoop";
export default function DetailsCard({
	title,
	description,
	state,
	memberCount,
	isMember,
	balance,
	loopAddress,
	refreshLoopData,
	refreshMembership,
}) {
	const contracts = [
		"Loop",
		"Plan",
		"Token",
		"TimeLock",
		"Governor",
		"Treasury",
		"Actions",
	];

	const { joinLoop, leaveLoop } = useJoinAndLeaveLoop(loopAddress, () => {
		refreshLoopData();
		refreshMembership();
	});
	const { account } = useMoralis();

	useMoralisSubscription(
		"JoinLeaveLoop",
		(q) => q.matches("loop", loopAddress, "i"),
		[loopAddress],
		{
			onCreate: (data) => refreshLoopData(),
			onUpdate: (data) => refreshLoopData(),
			onDelete: (data) => refreshLoopData(),
		}
	);

	return (
		<Card>
			<Title maj medium className="text-center">
				Details{" "}
			</Title>
			<HR width={"100%"} height="1px" />
			<Title small>{title}</Title>
			<p>{description}</p>
			<Tag className="text-center" style={{ width: "100%" }} state={state}>
				{state}
			</Tag>
			<HR width={"100%"} height="1px" />
			<div className="flex align-items-center justify-space-between">
				<Title small>Member count:</Title>
				<Title small>{memberCount}</Title>
			</div>
			<div className="flex align-items-center justify-space-between">
				<Title small>Loop balance:</Title>
				<Title small>{balance} $UNIT</Title>
			</div>
			{account && (
				<Button
					className="max-width"
					onClick={() => {
						if (isMember) {
							leaveLoop();
						} else joinLoop();
					}}
				>
					{!isMember ? "Join" : "Leave"} this loop
				</Button>
			)}{" "}
		</Card>
	);
}
