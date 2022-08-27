import styled from "styled-components";

export const LoopStateTag = styled.div<{ state: any }>`
	width: fit-content;
	padding: 5px 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	color: ${(props) =>
		props.state === 0
			? props.theme.palette.blue
			: props.state === 1
			? props.theme.palette.purple
			: props.state === 2
			? props.theme.palette.orange
			: props.state === 3
			? props.theme.palette.red
			: props.state === 4
			? props.theme.palette.lightGreen
			: props.state === 5
			? props.theme.palette.lightBlue
			: props.state === 6
			? props.theme.palette.primary
			: props.state === 7
			? props.theme.palette.secondary
			: props.theme.palette.lightGreen};
	border-radius: 20px;
	border: 1px solid
		${(props) =>
			props.state === 0
				? props.theme.palette.blue
				: props.state === 1
				? props.theme.palette.purple
				: props.state === 2
				? props.theme.palette.orange
				: props.state === 3
				? props.theme.palette.red
				: props.state === 4
				? props.theme.palette.lightGreen
				: props.state === 5
				? props.theme.palette.lightBlue
				: props.state === 6
				? props.theme.palette.primary
				: props.state === 7
				? props.theme.palette.secondary
				: props.theme.palette.lightGreen};
	border-radius: 20px;
`;
