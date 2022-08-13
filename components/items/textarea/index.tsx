import styled from "styled-components";

export const TextArea = styled.textarea`
	background: ${({ theme }) => theme.palette.foreground1};
	color: ${({ theme }) => theme.palette.primary};
	border: none;
	outline: none;
	padding: 10px 20px;
	width: ${(props) => props.width};
	height: ${(props) => props.height};

	border-radius: 10px;
	resize: ${(props) => (props.resize ? props.resize : "none")};
	margin-top: 2px;
	margin-bottom: 2px;
`;
