import styled from "styled-components";

type NumberProps = {
	alt?: boolean;
};

export const Number = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	border-radius: 50%;
	width: 20px;
	height: 20px;

	background: ${(props) => (props.alt ? props.theme.palette.primary : "")};
	color: ${(props) => (props.alt ? props.theme.palette.background : "")};
	border: ${(props) =>
		props?.alt ? "" : `1px solid ${props.theme.palette.primary}`};
`;
