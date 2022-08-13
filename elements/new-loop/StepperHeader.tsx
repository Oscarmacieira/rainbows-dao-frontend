import styled from "styled-components";
import { Card } from "../../components/items/card/index";
import { Title } from "../../components/items/typography/Title/index";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export const StepperHeader = ({
	steps,
	currentStep,
	handleStep = (value) => {},
}) => {
	return (
		<Card
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "flex-start",
			}}
		>
			{steps?.map((step, index) => (
				<StepTitle
					key={`step-${index}`}
					title={step}
					index={index + 1}
					maxStep={steps?.length}
					currentStep={currentStep + 1}
					onClickTitle={(value) => handleStep(value)}
				/>
			))}
		</Card>
	);
};

const StepTitle = ({
	title,
	index,
	maxStep,
	currentStep,
	onClickTitle = (index) => {},
}) => {
	return (
		<div className="flex justify-space-evenly max-width align-items-center">
			<ZoneTitle
				onClick={() => {
					if (currentStep >= index) {
						onClickTitle(index - 1);
					}
				}}
				style={{ cursor: currentStep >= index ? "pointer" : "" }}
			>
				{" "}
				<div className={currentStep >= index ? `circle done` : "circle"}>
					{index}
				</div>
				<Title small>{title}</Title>
			</ZoneTitle>
			<ArrowForwardIosIcon
				style={{ display: maxStep === index ? "none" : "block" }}
			/>
		</div>
	);
};

const ZoneTitle = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
	gap: 10px;

	.circle {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		border: 1px solid ${({ theme }) => theme.palette.secondary};
		border-radius: 50%;
	}
	.done {
		background: ${({ theme }) => theme.palette.primary};
		color: ${({ theme }) => theme.palette.background};
	}
`;
