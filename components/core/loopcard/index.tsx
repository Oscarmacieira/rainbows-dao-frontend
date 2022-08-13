import { Button } from "../../items/buttons/style";
import { Title } from "../../items/typography/Title/index";
import { LoopCardStyle } from "./style";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Tag } from "../tags/index";
export default function LoopCard({
	title = "Develop Rainbow",
	description = "This loop is all about defining and engineering the core principles of Rainbow",
	className = "",
	newLoop = false,
	state = "PLANNING",
}) {
	return (
		<LoopCardStyle
			className={`flex-desktop justify-space-between ${className} ${
				!newLoop ? "fg1" : "fg2"
			}  `}
		>
			{!newLoop ? (
				<>
					<div>
						<Title>{title}</Title>
						<p className="my-2">{description}</p>
						<Tag state={state}>{state}</Tag>
					</div>
					<Button outline>See more</Button>
				</>
			) : (
				<div className="new-loop hover-btn">
					<Title>Create a new loop</Title>
					<AddBoxIcon className="icon-more" style={{ height: "100%" }} />
				</div>
			)}{" "}
		</LoopCardStyle>
	);
}
