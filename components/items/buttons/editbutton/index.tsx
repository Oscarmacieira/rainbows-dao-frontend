import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
export const EditButton = ({
	onClickEdit = () => {},
	onClickSave = () => {},
	onClickCancel = () => {},
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const onEdit = () => {
		setIsEditing(true);
		onClickEdit();
	};

	const onSave = () => {
		setIsEditing(false);
		onClickSave();
	};

	const onCancel = () => {
		setIsEditing(false);
		onClickCancel();
	};

	return (
		<>
			{!isEditing ? (
				<div
					className="flex align-items-center hover-btn  "
					style={{ gap: 5, cursor: "pointer" }}
					onClick={onEdit}
				>
					<p>Edit</p> <EditIcon />
				</div>
			) : (
				<div className="flex align-items-end red" style={{ gap: 10 }}>
					<div
						className="flex align-items-center hover-btn"
						style={{ gap: 5 }}
						onClick={onCancel}
					>
						<CancelIcon /> <p>Cancel</p>{" "}
					</div>{" "}
					<div
						className="flex align-items-center hover-btn lightGreen"
						style={{ gap: 5 }}
						onClick={onSave}
					>
						<CheckCircleIcon /> <p>Save</p>{" "}
					</div>{" "}
				</div>
			)}
		</>
	);
};
