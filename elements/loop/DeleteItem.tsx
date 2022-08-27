import BasicModal from "../../components/items/modal/index";
import { Button } from "../../components/items/buttons/style";
import { Title } from "../../components/items/typography/Title/index";
import { HR } from "../../components/items/hr/index";
import { useAddAndRemoveItem } from "../../hooks/Plan/useAddItem";

export const DeleteItem = ({ planAddress, refreshData, item, loopAddress }) => {
	const { removeItem, itemHash } = useAddAndRemoveItem(
		loopAddress,
		planAddress
	);

	const onDeleteItem = async () => {
		removeItem({ itemId: item?.id, onSuccess: () => refreshData() });
	};

	return (
		<BasicModal
			title="Are you sure you want to delete this item?"
			cancelButtonText="No, cancel"
			confirmButtonText="Yes, delete"
			onCloseConfirm={() => onDeleteItem()}
			hrBottom={false}
			opener={
				<Button className="my-3" outline>
					Remove item
				</Button>
			}
		>
			<div />
		</BasicModal>
	);
};
