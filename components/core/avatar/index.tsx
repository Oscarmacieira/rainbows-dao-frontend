import Avatar from "@mui/material/Avatar";
import React, { CSSProperties, useRef, useState } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
export default function AvatarPic({
	imgSrc = "",
	size = "small",
	isOnline = true,
	indicator = true,
	modify = false,
	onChangeAvatar = (file: any) => {},
}) {
	const [isHover, setIsHover] = useState(false);
	let styling: CSSProperties = {
		width: 25,
		height: 25,
		position: "relative",
		cursor: "default",
	};

	const inputRef = useRef(null);
	const handleAvatarClick = (e: any) => {
		if (inputRef.current && modify) {
			inputRef.current.click();
		}
	};

	const handleAvatarChange = (e: any) => {
		onChangeAvatar(e?.target?.files[0]);
	};
	function setSize(pixels) {
		styling.width = pixels;
		styling.height = pixels;
		if (modify) {
			styling.cursor = "pointer";
		}
	}
	switch (size) {
		case "small":
			setSize(25);
			break;
		case "medium":
			setSize(50);
			break;
		case "large":
			setSize(120);
			break;
		default:
			break;
	}
	return (
		<div style={{ position: "relative" }}>
			{modify && isHover ? (
				<EditCircle
					onClick={handleAvatarClick}
					style={{
						width: styling.width,
						height: styling.height,
						cursor: "pointer",
						backgroundImage: `url(${imgSrc})`,
					}}
					onMouseLeave={() => setIsHover(false)}
				>
					<EditIcon className="icon" />
				</EditCircle>
			) : (
				<Avatar
					onMouseEnter={() => setIsHover(true)}
					src={imgSrc}
					style={styling}
				/>
			)}{" "}
			{indicator && (
				<OnlineIndicator
					style={{
						background: isOnline ? "#5ced73" : "#a9a9a9",
					}}
				/>
			)}
			<input
				accept="image/png, image/jpg, image/jpeg"
				onChange={handleAvatarChange}
				ref={inputRef}
				type={"file"}
				style={{ display: "none" }}
			/>
		</div>
	);
}

const OnlineIndicator = styled.div`
	position: absolute;
	bottom: 2px;
	right: 2px;
	width: 30%;
	height: 30%;
	border-radius: 50%;
	border: 2px solid ${({ theme }) => theme.palette.foreground1};
`;

const EditCircle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.5;
	border-radius: 50%;
	.icon {
		width: 30%;
		height: 30%;
		color: ${({ theme }) => theme.palette.background};
	}
`;
