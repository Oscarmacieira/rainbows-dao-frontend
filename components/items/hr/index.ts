import styled from "styled-components";

export const HR = styled.hr`
	width: ${(props) => props.width};
	border: none;
	height: ${(props) => props.height};
	background: ${({ theme }) => theme.palette.secondary};
`;
