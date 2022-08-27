import { Button } from "../../components/items/buttons/style";
import BasicModal from "../../components/items/modal/index";
import { Title } from "../../components/items/typography/Title/index";
import { HR } from "../../components/items/hr/index";
import { Input } from "../../components/items/input/index";
import { TextArea } from "../../components/items/textarea/index";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { title } from "process";
import { useActionContract } from "../../hooks/Action/useActionContract";
export const CreateAction = ({
	loopAddress,
	planAddress,
	actionAddress,
	onSuccessAdd,
	itemId,
	itemTitle,
}) => {
	const { Moralis } = useMoralis();
	const emptyAction = {
		title: "",
		payee: "",
		cost: 0,
		id: 0,
		itemId: itemId,
		loop: loopAddress,
	};

	const [action, setAction] = useState(emptyAction);

	function isValid() {
		if (action?.title === "" || action?.payee === "" || action?.cost <= 0)
			return false;
		return true;
	}

	const handleAction = (event: any, element: any) => {
		let value =
			element === "cost" ? event?.target.valueAsNumber : event?.target.value;
		setAction({ ...action, [element]: value });
	};

	const onAddAction = async () => {
		console.log(itemId);
		createAction(action, () => onSuccessAdd());
	};

	const { createAction } = useActionContract(actionAddress);

	return (
		<BasicModal
			title={`Let's create a new action for ${itemTitle}`}
			opener={
				<Button className="my-3" outline>
					+ Create an action
				</Button>
			}
			confirmButtonText="Add action"
			isConfirmButton={isValid()}
			onCloseConfirm={async () => onAddAction()}
			onCloseClick={() => setAction(emptyAction)}
		>
			<Title small maj>
				Title
			</Title>
			<Input width="100%" onChange={(e) => handleAction(e, "title")} />
			<br />
			<Title small maj>
				Payee{" "}
			</Title>
			<Input width={"100%"} onChange={(e) => handleAction(e, "payee")} />
			<br />
			<Title small maj>
				Cost
			</Title>
			<Input
				width="100%"
				type={"number"}
				onChange={(e) => handleAction(e, "cost")}
			/>
		</BasicModal>
	);
};
