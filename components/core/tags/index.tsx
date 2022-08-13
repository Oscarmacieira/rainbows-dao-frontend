import styled from "styled-components";

export const Tag = styled.div<{ state: string }>`
	width: fit-content;
	padding: 10px 20px;
	margin-top: 10px;
	margin-bottom: 10px;
	color: ${(props) =>
		props.state === "PLANNING"
			? props.theme.palette.blue
			: props.state === "FUNDRAISING"
			? props.theme.palette.purple
			: props.theme.palette.lightGreen};
	border-radius: 20px;
	border: 1px solid
		${(props) =>
			props.state === "PLANNING"
				? props.theme.palette.blue
				: props.state === "FUNDRAISING"
				? props.theme.palette.purple
				: props.theme.palette.lightGreen};
	border-radius: 20px;
`;
