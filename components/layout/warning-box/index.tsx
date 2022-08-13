import styled from "styled-components";
import { useConnect } from "../../../hooks/useConnect";
import ParticleAnimation from "../../animation/particle/index";
import { Button } from "../../items/buttons/style";
import { Title } from "../../items/typography/Title/index";
export const WarningBox = () => {
	const { login } = useConnect();
	return (
		<WarningBoxStyle fg1>
			<ParticleAnimation
				text={
					<div className="title">
						<Title className="mb-3">
							You need to be connnected to <br />
							create a new loop
						</Title>
						<Button onClick={login}>Click to connect</Button>
					</div>
				}
			/>
		</WarningBoxStyle>
	);
};

type WarningBoxProps = {
	fg1?: boolean;
};

const WarningBoxStyle = styled.section<WarningBoxProps>`
	width: 100%;
	height: 70vh;
	background: ${(props) =>
		props.fg1
			? props.theme.palette.foreground1
			: props.theme.palette.foreground2};
	overflow: hidden;
	border-radius: 20px;
`;
