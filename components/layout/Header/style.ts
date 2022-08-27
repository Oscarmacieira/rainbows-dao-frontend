import styled from "styled-components";
export const HeaderStyle = styled.header`
	position: relative;
	display: flex;
	justify-content: space-between;
	padding: 20px;
	background: ${({ theme }) => theme.palette.foreground1};
	border-radius: 15px;
	margin: 10px;
	overflow: hidden;
	.line {
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 5px;
		border-radius: 20px;
		left: 0;
		right: 0;

		margin-left: auto;
		margin-right: auto;
	}
`;

export const UnitBalanceBox = styled.div`
	background: ${({ theme }) => theme.palette.foreground2};
	padding: 10px 20px;
	border-radius: 20px;
	border: 1px solid ${({ theme }) => theme.palette.secondary};
	position: relative;
	right: -20px;
	padding-right: 30px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;
`;
