import styled from "styled-components";

export const ParticleBox = styled.section`
	width: 100%;
	height: 100%;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	font-size: 2rem;
	position: relative;
	overflow: hidden;

	.title {
		position: absolute;
		left: 0;
		right: 0;
		margin-right: auto;
		margin-left: auto;
	}
	#tsparticles {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		white-space: nowrap;
		.particle-canvas  {
			position: absolute !important;
			width: 100%;
			height: 100% !important;
			top: 0;
			left: 0;
		}
	}
`;
