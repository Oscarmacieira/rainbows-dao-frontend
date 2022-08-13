import { ParticleBox } from "./style";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ParticlesConfig from "./particle-config";
import styled from "styled-components";

export default function ParticleAnimation({
	text = (
		<h1 className="title">
			Because technology can rhythm <br />
			with virtuosity
		</h1>
	),
}) {
	const particlesInit = async (main) => {
		console.log(main);
		await loadFull(main);
	};

	return (
		<ParticleBox>
			<Particles
				init={particlesInit}
				params={ParticlesConfig}
				canvasClassName="particle-canvas"
			></Particles>
			{text}{" "}
		</ParticleBox>
	);
}
