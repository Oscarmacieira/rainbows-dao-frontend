import * as React from "react";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import styled from "styled-components";

export const PopperEmpty = ({ opener, children, height = "500px" }) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);
	const [open, setOpen] = React.useState(false);
	const [placement, setPlacement] = React.useState<PopperPlacementType>();

	const handleClick = (newPlacement: PopperPlacementType) => (event: any) => {
		setAnchorEl(event.currentTarget);
		setOpen((prev) => placement !== newPlacement || !prev);
		setPlacement(newPlacement);
	};

	return (
		<>
			{open && (
				<div
					onClick={() => {
						setOpen(false);
					}}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background: "transparent",
						zIndex: 2,
					}}
				></div>
			)}
			<PopperFilterStyle>
				<Popper
					open={open}
					anchorEl={anchorEl}
					placement={placement}
					transition
					sx={{ zIndex: 4 }}
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<PopperContent
								style={{ height: height }}
								onMouseLeave={() => setOpen(false)}
							>
								<div className="data">{children}</div>
							</PopperContent>
						</Fade>
					)}
				</Popper>

				<div
					className={open ? "" : ""}
					style={{
						zIndex: open ? 6 : 2,
						cursor: "pointer",
						width: "fit-content",
					}}
					onClick={handleClick("bottom-end")}
				>
					{opener}
				</div>
			</PopperFilterStyle>
		</>
	);
};

export const PopperFilterStyle = styled.div`
	height: fit-content;
	position: relative;
	#arrow-down {
		transform: rotate(180deg);
	}

	.popper-content {
	}

	.active {
		background-color: ${({ theme }) => theme.palette.secondary};
		color: ${({ theme }) => theme.palette.primary};
		border: 1.5px solid transparent;
	}
`;

const PopperContent = styled.div`
	margin-top: 10px;
	border-radius: 20px;
	background-color: ${({ theme }) => theme.palette.foreground1};
	overflow: hidden;
	min-width: 230px;
	height: 500px;
	position: relative;
	z-index: 4;

	color: ${({ theme }) => theme.palette.primary};
	border: 1.5px solid ${({ theme }) => theme.palette.secondary};
	.data {
		padding: 10px;
		overflow: scroll;
		max-height: 420px;
		&::-webkit-scrollbar {
			display: none;
		}
		hr {
			height: 1px;
			opacity: 0.5;
			border: 0px;
			background-color: ${({ theme }) => theme.palette.secondary};
		}
	}

	hr {
		border: 0px;
		height: 1px;
		color: red;
		background-color: ${({ theme }) => theme.palette.red};

		width: 100%;
	}
`;
