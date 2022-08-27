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
import { useCrowdFund } from "../../hooks/CrowdFund/useCrowndFund";
import { useUnitAllowance } from "../../hooks/UnitToken/useUnitAllowance";
import { useUnitBalance } from "../../hooks/UnitToken/useUnitBalance";
const steps = ["Input Amount", "Approve contracts", "Pledge campaign"];
export const PledgeModal = ({
	loopAddress,
	fundraiserAddress,
	campaign,
	refreshCampaign = () => {},
}) => {
	const { Moralis, user } = useMoralis();
	const [amount, setAmount] = useState(0);
	const { pledge } = useCrowdFund(loopAddress, fundraiserAddress);
	const { allowance, getAllowance, approve } =
		useUnitAllowance(fundraiserAddress);
	const { getUnitBalance } = useUnitBalance();
	const [step, setStep] = useState(1);
	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);

	useEffect(() => {
		getAllowance();
	}, [fundraiserAddress]);
	return (
		<BasicModal
			title={"Let's pledge this loop!"}
			opener={<Button>Pledge</Button>}
			isConfirmButton={
				step === 1
					? amount > 0 && amount <= campaign?.goal - campaign?.pledged
					: true
			}
			confirmButtonText={
				step === 1 ? "Confirm" : step === 2 ? "Approve" : "Pledge"
			}
			cancelButtonText={step === 1 ? "Cancel" : "< Back"}
			confirmCloseModal={step > 2}
			cancelCloseModal={step === 1}
			onCloseConfirm={async () => {
				switch (step) {
					case 1:
						nextStep();
						break;
					case 2:
						if (amount <= allowance) {
							nextStep();
						} else {
							approve(amount, () => {
								getAllowance();
								nextStep();
							});
						}
						break;
					case 3:
						pledge(amount, () => {
							refreshCampaign();

							getUnitBalance();
							setStep(1);
						});
						break;
					default:
						break;
				}
			}}
			onCloseClick={() => {
				switch (step) {
					case 1:
						break;
					case 2:
						prevStep();

						break;
					case 3:
						prevStep();
						break;
					default:
						break;
				}
			}}
		>
			<StepperStyle activeStep={step} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabelStyle>{label}</StepLabelStyle>
					</Step>
				))}
			</StepperStyle>
			{step === 1 && (
				<>
					<br />
					<p>
						How many $UNIT do you wish to pledge?
						<br />
						<b>Max {campaign?.goal - campaign?.pledged} $UNIT</b>
					</p>
					<Input
						width={"100%"}
						type="number"
						value={amount}
						onChange={(e) => {
							let val = e?.target.valueAsNumber;
							setAmount(val);
						}}
					/>
				</>
			)}
			{step === 2 ? (
				<Box className="my-3 text-center" fg1>
					<Title small>{getShortWallet(fundraiserAddress)}</Title>
					<p>Current allowance: {allowance} $UNIT</p>{" "}
				</Box>
			) : (
				<></>
			)}{" "}
			{step === 3 && (
				<Box className="my-3 text-center" fg1>
					<Title small>{amount} $UNIT</Title>
				</Box>
			)}
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
