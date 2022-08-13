import styled from "styled-components";

type BoxProps = {
	fg1?: boolean;
};

export const Box = styled.section<{ BoxProps }>`
	background-color: ${(props) =>
		props.fg1
			? props.theme.palette.foreground1
			: props.theme.palette.foreground2};
	width: 100%;
	border-radius: 20px;
	padding: 20px;
`;
