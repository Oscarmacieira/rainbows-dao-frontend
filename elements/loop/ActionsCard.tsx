import { Card } from "../../components/items/card/index";
import { HR } from "../../components/items/hr/index";
import { Title } from "../../components/items/typography/Title/index";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Tag } from "../../components/core/tags/index";
import { Button } from "../../components/items/buttons/style";
import { Number } from "./style";
import BasicModal from "../../components/items/modal/index";
import { Input } from "../../components/items/input/index";
import { TextArea } from "../../components/items/textarea/index";
import { CreateItem } from "./CreateItem";
import { DeleteItem } from "./DeleteItem";
import { ProgressBar } from "../../components/items/progressBar/index";
export default function ActionsCard({ isMember = false, loopAddress = "12" }) {
	const actions = [
		{ id: 1, title: "print 10000 flyers", cost: 200, payee: "0x123123" },
		{
			id: 2,
			title: "promote event on facebook",
			cost: 400,
			payee: "0x1231",
		},
	];
	return (
		<Card fg2>
			<div className="flex align-items-center justify-space-between">
				<Title maj medium className="text-center">
					ACtions
				</Title>
			</div>
			<HR width={"100%"} height="1px" className="mb-3" />
		</Card>
	);
}
