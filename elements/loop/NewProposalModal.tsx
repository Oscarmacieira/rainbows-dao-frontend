import { Button } from "../../components/items/buttons/style";
import BasicModal from "../../components/items/modal/index";
import { Title } from "../../components/items/typography/Title/index";
import { HR } from "../../components/items/hr/index";
import { Input } from "../../components/items/input/index";
import { TextArea } from "../../components/items/textarea/index";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useAddAndRemoveItem } from "../../hooks/Plan/useAddItem";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import styled from "styled-components";
import { Box } from "../../components/items/box/style";
import { getShortWallet } from "../../utils/shortWallet";
import { useDelegateToken } from "../../hooks/GovernanceToken/useDelegateToken";
import { useProposePlan } from "../../hooks/Loop/useProposePlan";

const steps = ["Token Delegation", "Propose Plan"];
export const NewPropoSalModal = ({
	loopAddress,
	planAddress,
	tokenAddress,
	plan,
	refreshProposal = () => {},
}) => {
	const { Moralis, user } = useMoralis();
	const { delegate, delegates, delegateAddress } = useDelegateToken(
		loopAddress,
		tokenAddress
	);

	const { proposePlan } = useProposePlan(loopAddress, planAddress);

	useEffect(() => {
		delegates(() => {});
	}, [user]);

	useEffect(() => {
		if (
			delegateAddress.toLowerCase() === user?.get("ethAddress")?.toLowerCase()
		) {
			setStep(2);
		} else setStep(1);
	}, [delegateAddress]);

	const [step, setStep] = useState(1);
	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);
	return (
		<BasicModal
			title={"Let's create a new proposal!"}
			opener={<Button>+ Create a proposal </Button>}
			confirmButtonText={step === 1 ? "Delegate" : "Propose"}
			cancelButtonText={step === 1 ? "Cancel" : "< Back"}
			confirmCloseModal={step > 1}
			cancelCloseModal={step === 1}
			onCloseConfirm={async () => {
				if (step === 1) {
					delegate(() => nextStep());
				} else {
					proposePlan(plan, () => {
						refreshProposal();
					});
				}
			}}
			onCloseClick={() => {}}
		>
			<StepperStyle activeStep={step} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabelStyle>{label}</StepLabelStyle>
					</Step>
				))}
			</StepperStyle>
			{step === 1 ? (
				<Box className="my-3 text-center" fg1>
					<Title small>{getShortWallet(user?.get("ethAddress"))}</Title>
				</Box>
			) : (
				<></>
			)}{" "}
		</BasicModal>
	);
};

const StepperStyle = styled(Stepper)`
	span {
		color: ${({ theme }) => theme.palette.primary};
		.Mui-active {
			color: ${({ theme }) => theme.palette.primary};
		}
		.Mui-completed {
			color: ${({ theme }) => theme.palette.lightGreen};
		}
	}
`;

const StepLabelStyle = styled(StepLabel)`
	span {
		.MuiStep-root {
			color: yellow;
		}
		color: ${({ theme }) => theme.palette.primary};
	}
`;
