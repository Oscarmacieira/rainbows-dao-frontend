import Head from "next/head";
import { Container } from "../components/layout/Container/style";
import { useMoralis } from "react-moralis";
import { WarningBox } from "../components/layout/warning-box/index";
import { useConnect } from "../hooks/useConnect";
import { Card } from "../components/items/card/index";
import { HR } from "../components/items/hr/index";
import { Title } from "../components/items/typography/Title/index";
import { StepperHeader } from "../elements/new-loop/StepperHeader";
import { useState } from "react";
import { Button } from "../components/items/buttons/style";
import { Input } from "../components/items/input/index";
import { TextArea } from "../components/items/textarea/index";
import { useToast } from "../hooks/useToast";

export default function NewLoop() {
	const { user, account, isAuthenticated } = useMoralis();
	const { notify } = useToast();

	const steps = ["Set up title", "Define Description", "Deploy loop"];
	const [step, setStep] = useState(0);
	const incrStep = () => setStep(step + 1);
	const decrStep = () => setStep(step - 1);
	const handleStep = (value) => setStep(value);

	const [loopDetails, setLoopDetails] = useState({
		title: "",
		description: "",
	});
	const deployNewLoop = () => {
		notify({ type: "error", message: "Contracts are not connected yet" });
	};

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
				{!isAuthenticated || !account || !user ? (
					<WarningBox />
				) : (
					<>
						<Title maj large className="text-center my-5">
							Let`s create a loop
						</Title>
						<HR
							width={"70%"}
							height={"3px"}
							className="rainbow-background  mb-5"
						/>
						<StepperHeader
							steps={steps}
							currentStep={step}
							handleStep={(value) => handleStep(value)}
						/>
						<br />
						<Card fg2>
							{step === 0 && (
								<>
									<Title medium maj className="mb-3">
										Title
									</Title>
									<Input
										width={"100%"}
										placeholder={"Rainbows Live"}
										value={loopDetails.title}
										onChange={(e) =>
											setLoopDetails({ ...loopDetails, title: e?.target.value })
										}
									/>
								</>
							)}
							{step === 1 && (
								<>
									<Title medium maj className="mb-3">
										Description{" "}
									</Title>
									<TextArea
										width={"100%"}
										height={"150px"}
										placeholder={"A global metaverse event to change the world"}
										value={loopDetails.description}
										onChange={(e) =>
											setLoopDetails({
												...loopDetails,
												description: e?.target.value,
											})
										}
									/>
								</>
							)}
							{step === 2 && (
								<>
									<Title medium maj className="mb-3 text-center">
										Overview
									</Title>
									<Title small>Title</Title>
									<p>{loopDetails.title}</p>

									<HR
										width={"100%"}
										height={"2px"}
										className="my-3"
										style={{ opacity: 0.2 }}
									/>
									<Title small>Description</Title>
									<p>{loopDetails.description}</p>
								</>
							)}
							<div
								style={{
									marginLeft: "auto",
									marginRight: "0px",
									marginTop: "20px",
									width: "fit-content",
								}}
							>
								<Button
									disabled={
										step === 0 && loopDetails.title === ""
											? true
											: step === 1 && loopDetails.description === ""
											? true
											: false
									}
									onClick={() => {
										if (step < steps?.length - 1) {
											incrStep();
										} else {
											deployNewLoop();
										}
									}}
									className={
										step < steps?.length - 1 ? "" : "rainbow-background"
									}
								>
									{step < steps?.length - 1
										? "Next step >"
										: "Confirm & deploy"}{" "}
								</Button>
								<p
									style={{ display: step === 0 ? "none" : "block" }}
									onClick={() => {
										decrStep();
									}}
									className="scale my-2"
								>
									{"< Go Back"}
								</p>
							</div>{" "}
						</Card>
					</>
				)}
			</Container>
		</div>
	);
}
