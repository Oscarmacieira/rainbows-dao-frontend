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
import { CreateAction } from "./CreateAction";
import { useMoralis } from "react-moralis";
import { useEffect, useMemo } from "react";
import { Box } from "../../components/items/box/style";
import { useActionContract } from "../../hooks/Action/useActionContract";
import PaymentIcon from "@mui/icons-material/Payment";
import CommitIcon from "@mui/icons-material/Commit";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { UNIT, ZERO_ADDRESS } from "../../constants/constants";
import { getShortWallet } from "../../utils/shortWallet";
export default function PlanCard({
	isMember = false,
	loopAddress,
	planAddress,
	actionAddress,
	items,
	refreshItems,
	refreshPlan,
	refreshLoopData,
	loopState,
	plan,
	display,
}) {
	const { account } = useMoralis();

	const totalBudget = useMemo(() => {
		let total = 0;
		console.log(items);
		for (let item of items) {
			total += item.budget;
		}
		console.log(total);
		return [total];
	}, [items]);

	return (
		<Card fg2>
			<div className="flex align-items-center justify-space-between">
				<Title maj medium className="text-center">
					{loopState !== "PLANNING" ? "Loop planning" : "Loop Items"}{" "}
				</Title>
				{account && isMember && loopState === "PLANNING" && (
					<CreateItem
						loopAddress={loopAddress}
						planAddress={planAddress}
						onSuccessAdd={() => refreshItems()}
					/>
				)}{" "}
			</div>
			<HR width={"100%"} height="1px" className="mb-3" />
			{display?.map((item: any, index: number) => (
				<div
					key={`item-${index}`}
					className="flex  max-width"
					style={{ gap: 10 }}
				>
					<div className="flex-column justify-content-center align-items-center">
						<Number alt>{index + 1}</Number>{" "}
						<div
							className="primary"
							style={{ width: "2px", height: "100%", marginInline: "auto" }}
						/>
					</div>
					<div className="ml-3 max-width">
						<Title small>{item?.title}</Title>
						<p>{item?.description}</p>
						<p>
							Budget: <b>{item?.budget} $UNIT</b>
						</p>
						{account && isMember && loopState === "PLANNING" && (
							<DeleteItem
								item={item}
								planAddress={planAddress}
								refreshData={() => refreshItems()}
								loopAddress={loopAddress}
							/>
						)}{" "}
						{account && isMember && loopState === "IMPLEMENTING" && (
							<>
								<CreateAction
									loopAddress={loopAddress}
									planAddress={planAddress}
									onSuccessAdd={() => refreshPlan()}
									actionAddress={actionAddress}
									itemId={item?.id}
									itemTitle={item?.title}
								/>
							</>
						)}
						{loopState === "IMPLEMENTING" &&
							item?.actions?.map((action, id) => (
								<ActionBox
									key={`action-${id}`}
									loopAddress={loopAddress}
									index={id}
									title={action?.title}
									payee={action?.payee}
									cost={action?.cost}
									actionId={action?.id}
									itemId={item?.id}
									actionAddress={actionAddress}
									isMember={isMember}
									refreshLoopData={() => refreshLoopData()}
								/>
							))}
					</div>{" "}
					<br />
				</div>
			))}

			<Title className="mt-3" small>
				{totalBudget} ${UNIT?.ticker} needed
			</Title>
		</Card>
	);
}

const ActionBox = ({
	index,
	title,
	payee,
	cost,
	actionAddress,
	loopAddress,
	refreshLoopData,
	actionId,
	itemId,
	isMember,
}) => {
	const { getAction, actionData, validateAction, executeAction, payAction } =
		useActionContract(actionAddress);

	const refreshActionData = () => {
		getAction(itemId, actionId);
	};
	useEffect(() => {
		refreshActionData();
	}, [actionId]);

	return (
		<Box fg1 style={{ width: "100%" }} className="mb-3">
			<div className="flex align-items-center justify-space-between">
				<div>
					<p>
						Title:
						<b> {title}</b>
					</p>
					<p>
						Payee: <i>{payee}</i>
					</p>
					<p>
						Cost: <b>{actionData?.cost} $UNIT</b>
					</p>
					<i>Created by {getShortWallet(actionData?.createdBy)}</i>
				</div>
				<div>
					<div
						className="flex align-items-center my-1"
						style={{
							gap: 5,
							visibility:
								actionData?.validatedBy === ZERO_ADDRESS ? "hidden" : "visible",
						}}
					>
						<BeenhereIcon />
						<b>Validated</b>
					</div>
					<div
						className="flex align-items-center my-1"
						style={{
							gap: 5,
							visibility: !actionData?.executed ? "hidden" : "visible",
						}}
					>
						<CommitIcon />
						<b>Executed</b>
					</div>
					<div
						className="flex align-items-center my-1"
						style={{
							gap: 5,
							visibility: actionData?.paid ? "visible" : "hidden",
						}}
					>
						<PaymentIcon />
						<b>Paid</b>
					</div>
				</div>
			</div>
			<HR className="primary" width={"100%"} height={"1px"} />
			<div
				className="flex align-items-center justify-space-between mt-3"
				style={{ gap: 20, display: isMember ? "flex" : "none" }}
			>
				{actionData?.validatedBy === ZERO_ADDRESS && (
					<Button
						onClick={() =>
							validateAction(itemId, actionId, () => refreshActionData())
						}
					>
						Validate
					</Button>
				)}
				{!actionData?.executed && (
					<Button
						outline
						onClick={() =>
							executeAction(itemId, actionId, () => refreshActionData())
						}
					>
						Execute
					</Button>
				)}
				{!actionData?.paid && actionData?.validatedBy !== ZERO_ADDRESS && (
					<Button
						onClick={() =>
							payAction(itemId, actionId, loopAddress, () => {
								refreshActionData();
								refreshLoopData();
							})
						}
						text
					>
						Pay
					</Button>
				)}
			</div>
		</Box>
	);
};
