import { Button } from "../../items/buttons/style";
import { Title } from "../../items/typography/Title/index";
import { LoopCardStyle } from "./style";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Tag } from "../tags/index";
import { useToast } from "../../../hooks/useToast";
import Link from "../../../node_modules/next/link";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { useLoopData } from "../../../hooks/Loop/useLoopData";
import { useEffect } from "react";
export default function LoopCard({
	className = "",
	newLoop = false,
	loopAddress = "123",
}) {
	const { notify } = useToast();
	const { goToNewLoop } = useAppNavigation();
	const onSeeMore = () => {
		goToLoop(loopAddress);
	};

	const { goToLoop } = useAppNavigation();
	const { loopData, getLoopData } = useLoopData(loopAddress);
	useEffect(() => {
		getLoopData();
	}, [loopAddress]);
	return (
		<LoopCardStyle
			className={`flex-desktop justify-space-between ${className} ${
				!newLoop ? "fg1" : "fg2"
			}  `}
		>
			{!newLoop ? (
				<>
					<div>
						<Title>{loopData?.title}</Title>
						<p className="my-2">{loopData?.description}</p>
						<p>
							<b>Contract address:</b> #{loopAddress}
						</p>
						<p>
							<b>Member count: {loopData?.memberCount} </b>
						</p>

						<Tag state={loopData?.state}>{loopData?.state}</Tag>
					</div>
					<Button onClick={onSeeMore} outline>
						See more
					</Button>
				</>
			) : (
				<Link href={`${goToNewLoop()}`}>
					<div className="new-loop hover-btn">
						<Title>Create a new loop</Title>
						<AddBoxIcon className="icon-more" style={{ height: "100%" }} />
					</div>
				</Link>
			)}{" "}
		</LoopCardStyle>
	);
}
