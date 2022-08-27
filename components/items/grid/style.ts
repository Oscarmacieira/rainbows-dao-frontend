import styled from "styled-components";

export const OneThirdTwoThird = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 1fr;
	grid-column-gap: 20px;
	grid-row-gap: 20px;

	.div1 {
		grid-area: 1 / 1 / 2 / 2;
		gap: 20px;
		display: flex;
		flex-direction: column;
	}
	.div2 {
		grid-area: 1 / 2 / 2 / 4;
		gap: 20px;
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 1100px) {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`;
