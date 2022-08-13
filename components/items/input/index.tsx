import styled from "styled-components";

type InputProps = {
	width?: string;
};

export const Input = styled.input<InputProps>`
	background: ${({ theme }) => theme.palette.foreground1};
	color: ${({ theme }) => theme.palette.primary};
	border: none;
	outline: none;
	padding: 10px 20px;
	width: ${(props) => props.width};
	border-radius: 10px;
	margin-top: 2px;
	margin-bottom: 2px;
`;
