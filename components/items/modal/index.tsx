import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { Title } from "../typography/Title/index";
import { HR } from "../hr/index";
import { Button } from "../buttons/style";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	border: "2px solid #000",
	boxShadow: 24,
};

export default function BasicModal({
	title = "The modal title",
	cancelButtonText = "Cancel",
	confirmButtonText = "Confirm",
	isConfirmButton = true,
	isCancelButton = true,
	opener,
	children,
	hrBottom = true,
	onCloseClick = () => {},
	onCloseConfirm = async () => {},
	confirmCloseModal = true,
	cancelCloseModal = true,
}) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		onCloseClick();
		if (cancelCloseModal || confirmCloseModal) setOpen(false);
	};

	const handleConfirm = async () => {
		await onCloseConfirm();

		if (confirmCloseModal) {
			handleClose();
		}
	};

	return (
		<div>
			<div onClick={handleOpen}>{opener}</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<BoxStyle style={style}>
					<Title medium>{title}</Title>
					<HR width="100%" height="1px" className="my-3" />
					{children}
					{hrBottom && <HR width="100%" height="1px" className="my-3" />}{" "}
					<div className="max-width mt-3 flex align-items-center justify-space-between">
						{isCancelButton && (
							<Button outline onClick={handleClose}>
								{cancelButtonText}{" "}
							</Button>
						)}{" "}
						{isConfirmButton && (
							<Button onClick={handleConfirm}>{confirmButtonText}</Button>
						)}
					</div>
				</BoxStyle>
			</Modal>
		</div>
	);
}

const BoxStyle = styled.div`
	border-radius: 20px;
	background: ${({ theme }) => theme.palette.foreground2};
	color: ${({ theme }) => theme.palette.primary};
	padding: 20px;
`;
