import styled from "styled-components";

export const Button = styled.button`
	padding: 10px 25px;
	background: ${(props) =>
		props.text || props.outline ? "transparent" : props.theme.palette.primary};
	border-radius: ${(props) => (props.text ? "0px" : "20px")};
	outline: none;
	color: ${(props) =>
		props.text || props.outline
			? props.theme.palette.primary
			: props.theme.palette.background};
	border: ${(props) =>
		props.text ? "none" : `1.8px solid ${props.theme.palette.secondary}`};
	border-bottom: ${(props) => (props.text ? "1.8px solid transparent" : "")};
	box-shadow: none;
	border-bottom: ${(props) => (props.text ? `transparent` : "")};

	&:hover {
		border-bottom: ${(props) =>
			props.text ? `1.8px solid ${props.theme.palette.primary}` : ""};
    color: ${(props) =>
			props.outline
				? props.theme.palette.background
				: props.theme.palette.primary};
		
	background: ${(props) =>
		props.text
			? "transparent"
			: props.outline
			? props.theme.palette.secondary
			: props.theme.palette.background};
    &:disabled {
	opacity:0.3;
}   `;
