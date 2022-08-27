import { Button } from "../../components/items/buttons/style";
import BasicModal from "../../components/items/modal/index";
import { Title } from "../../components/items/typography/Title/index";
import { HR } from "../../components/items/hr/index";
import { Input } from "../../components/items/input/index";
import { TextArea } from "../../components/items/textarea/index";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useAddAndRemoveItem } from "../../hooks/Plan/useAddItem";
export const CreateItem = ({ loopAddress, planAddress, onSuccessAdd }) => {
	const { Moralis } = useMoralis();
	const { addItem } = useAddAndRemoveItem(loopAddress, planAddress);
	const emptyItem = {
		title: "",
		description: "",
		budget: 0,
	};

	const [item, setNewItem] = useState(emptyItem);

	function isValid() {
		if (item?.title === "" || item?.description === "" || item.budget < 0)
			return false;
		return true;
	}

	const handleItem = (event: any, element: any) => {
		let value =
			element === "budget" ? event?.target.valueAsNumber : event?.target.value;
		setNewItem({ ...item, [element]: value });
	};

	const onAddItem = async () => {
		addItem({
			title: item.title,
			description: item.description,
			budget: item.budget,
			onSuccess: () => onSuccessAdd(),
		});
	};

	return (
		<BasicModal
			title={"Let's create a new item"}
			opener={<Button text>+ Create an item</Button>}
			confirmButtonText="Add item"
			isConfirmButton={isValid()}
			onCloseConfirm={async () => onAddItem()}
			onCloseClick={() => setNewItem(emptyItem)}
		>
			<Title small maj>
				Title
			</Title>
			<Input width="100%" onChange={(e) => handleItem(e, "title")} />
			<br />
			<Title small maj>
				Description{" "}
			</Title>
			<TextArea width={"100%"} onChange={(e) => handleItem(e, "description")} />
			<br />
			<Title small maj>
				Budget
			</Title>
			<Input
				width="100%"
				type={"number"}
				onChange={(e) => handleItem(e, "budget")}
			/>
		</BasicModal>
	);
};
