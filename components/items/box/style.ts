import styled from "styled-components";

export const Box = styled.section`
	background-color: ${(props) =>
		props.fg1
			? props.theme.palette.foreground1
			: props.theme.palette.foreground2};
	width: 100%;
	border-radius: 20px;
	padding: 20px;
`;
