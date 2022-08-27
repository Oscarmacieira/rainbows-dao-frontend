import ParticleAnimation from "../components/animation/particle/index";
import LoopCard from "../components/core/loopcard/index";
import { HR } from "../components/items/hr/index";
import { Title } from "../components/items/typography/Title/index";
import Head from "next/head";
import { Container } from "../components/layout/Container/style";
import { useToast } from "../hooks/useToast";
import { getAllLoops } from "./api/getAllLoops";

import { useEffect, useState } from "react";
import { PaginationStyled } from "../components/items/pagination/style";

export default function Home() {
	const { notify } = useToast();
	const { loops, fetchAllLoops } = getAllLoops();
	const [page, setPage] = useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	};

	const getCurrentLoops = () => {
		const start = (page - 1) * 4;
		const end = start + 4;

		return loops.slice(start, end);
	};

	const pager = (
		<PaginationStyled
			count={Math.ceil(loops?.length / 4)}
			defaultPage={1}
			onChange={(e, value) => handleChange(e, value)}
			page={page}
		/>
	);
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
					<div className="max-width flex align-items-center justify-space-between">
						<Title maj>Popular loops</Title>
						{pager}
					</div>{" "}
					{getCurrentLoops().map((loop: any, index: any) => (
						<LoopCard key={`loop-${index}`} loopAddress={loop?.address} />
					))}{" "}
					{pager}
				</div>
			</Container>{" "}
		</>
	);
}
