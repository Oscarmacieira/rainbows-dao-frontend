import { Button } from "../../items/buttons/style";
import { Title } from "../../items/typography/Title/index";
import { LoopCardStyle } from "./style";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Tag } from "../tags/index";
import { useToast } from "../../../hooks/useToast";
import Link from "../../../node_modules/next/link";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
export default function LoopCard({
	title = "Develop Rainbow",
	description = "This loop is all about defining and engineering the core principles of Rainbow",
	className = "",
	newLoop = false,
	state = "PLANNING",
}) {
	const { notify } = useToast();
	const { goToNewLoop } = useAppNavigation();
	const onSeeMore = () => {
		notify({
			type: "error",
			message: "We are building the loop page",
		});
	};
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
