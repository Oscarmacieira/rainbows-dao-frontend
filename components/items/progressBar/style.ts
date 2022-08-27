import styled from "styled-components";

type BarProps = {
	width?: string;
	fg1: boolean;
};

export const Bar = styled.div<BarProps>`
	width: ${(props) => (props?.width ? props.width : "100%")};
	border-radius: 20px;

	height: 30px;
	border: 1px solid ${({ theme }) => theme.palette.secondary};

	background: ${(props) =>
		props?.fg1
			? props.theme.palette.foreground1
			: props.theme.palette.foreground2};
	overflow: hidden;
	display: flex;
	align-items: center;
`;

export const InnerBar = styled.div<BarProps>`
	width: ${(props) => (props?.width ? props.width : "100%")};
	height: 100%;
	background: linear-gradient(
		90deg,
		rgba(255, 0, 0, 1) 0%,
		rgba(255, 154, 0, 1) 10%,
		rgba(208, 222, 33, 1) 20%,
		rgba(79, 220, 74, 1) 30%,
		rgba(63, 218, 216, 1) 40%,
		rgba(47, 201, 226, 1) 50%,
		rgba(28, 127, 238, 1) 60%,
		rgba(95, 21, 242, 1) 70%,
		rgba(186, 12, 248, 1) 80%,
		rgba(251, 7, 217, 1) 90%,
		rgba(255, 0, 0, 1) 100%
	);
	color: white;

	border-right: 1px solid ${({ theme }) => theme.palette.secondary};
`;

export const Tag = styled.div<BarProps>`
	color: ${({ theme }) => theme.palette.primary};
	background: ${(props) =>
		props?.fg1
			? props.theme.palette.foreground2
			: props.theme.palette.foreground1};
	padding: 20px;
`;
