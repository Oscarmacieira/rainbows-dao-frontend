import ParticleAnimation from "../components/animation/particle/index";
import LoopCard from "../components/core/loopcard/index";
import { HR } from "../components/items/hr/index";
import { Title } from "../components/items/typography/Title/index";
import Head from "next/head";
import { Container } from "../components/layout/Container/style";

export default function Home() {
	return (
		<>
			<Head>
				<title>Rainbows DAO</title>
				<meta
					name="description"
					content="Because technology rhythm with virtuosity"
				/>
			</Head>
			<Container>
				<div style={{ width: "100%", height: "350px" }}>
					<ParticleAnimation />
				</div>{" "}
				<HR width={"80%"} height={"3px"} className="rainbow-background" />
				<br />
				<br />
				<div className="text-start flex-column" style={{ gap: 20 }}>
					<Title maj>Popular loops</Title>
					<LoopCard />
					<LoopCard />
					<LoopCard />
				</div>
			</Container>{" "}
		</>
	);
}
