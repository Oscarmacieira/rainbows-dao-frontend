import styled from "styled-components";

type HRProps = {
	width?: string;
	height?: string;
};

export const HR = styled.hr<HRProps>`
	width: ${(props) => props.width};
	border: none;
	height: ${(props) => props.height};
	background: ${({ theme }) => theme.palette.secondary};
`;
