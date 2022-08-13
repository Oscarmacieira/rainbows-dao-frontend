import { Box } from "../../components/items/box/style";
import AvatarPic from "../../components/core/avatar/index";
import { Title } from "../../components/items/typography/Title/index";
import { HR } from "../../components/items/hr/index";
import { EditButton } from "../../components/items/buttons/editbutton/index";
import { useContext, useState } from "react";
import { Input } from "../../components/items/input/index";
import { TextArea } from "../../components/items/textarea/index";
import { useUserDetail } from "../../hooks/useUserDetail";
import { useToast } from "../../hooks/useToast";
import { useMoralisFile } from "react-moralis";
import {UserContext} from "../../contexts/UserContextProvider";
export const UserBox = ({
	isUser = false,
	imgSrc = "",
	address = "0x8d3bd47c94b340e0151376abf9d76c74c471e213",
	username = "Oscarmacieira",
	description = "Hey! I am a web3 dev seeking to leverage the latest technolohy to help spread goodness around the world",
	refrechData = () => {},
}) => {
	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const [isEditingAbout, setIsEditingAbout] = useState(false);
	const { notify } = useToast();
	const { saveFile } = useMoralisFile();
	const [newData, setNewData] = useState({
		username: username,
		about: description,
		avatar: imgSrc,
	});

	const { editAvatar, editUsername, editAbout } = useContext(UserContext);
	const onSaveUsername = () => {
		editUsername(
			newData.username,
			() => refrechData(),
			() => {
				notify({ type: "error", message: "This username is already taken" });
				setNewData({ ...newData, username: username });
			}
		);

		setIsEditingUsername(false);
	};

	const onSaveAbout = () => {
		editAbout(
			newData.about,
			() => refrechData(),
			() => {
				setNewData({ ...newData, about: description });
			}
		);
		setIsEditingAbout(false);
	};

	const onSaveAvatar = async (file) => {
		const newAvatar = file;
		const newAvatarName = file?.name;
		let newPic = await saveFile(newAvatarName, newAvatar, { saveIPFS: false });
		editAvatar(newPic, () => refrechData());
	};

	return (
		<Box fg2>
			<div
				className="flex-column justify-content-center align-items-center"
				style={{ gap: 10 }}
			>
				<AvatarPic
					onChangeAvatar={(file) => onSaveAvatar(file)}
					modify={isUser}
					size="large"
					imgSrc={imgSrc}
					indicator={false}
				/>

				<HR width={"100%"} height={"1px"} />
				<div className="max-width">
					<Title maj small>
						WALLET ADDRESS
					</Title>
					<p className="my-2">{address}</p>
				</div>
				<HR width={"100%"} height={"1px"} />
				<div className="max-width">
					<div className="flex align-items-center justify-space-between max-width">
						<Title maj small>
							USERNAME
						</Title>
						{isUser && (
							<EditButton
								onClickEdit={() => setIsEditingUsername(true)}
								onClickCancel={() => {
									setIsEditingUsername(false);
									setNewData({ ...newData, username: username });
								}}
								onClickSave={() => onSaveUsername()}
							/>
						)}{" "}
					</div>{" "}
					{!isEditingUsername ? (
						<p className="my-2">{username}</p>
					) : (
						<Input
							width={"100%"}
							placeholder={username}
							value={newData.username}
							onChange={(e) =>
								setNewData({ ...newData, username: e.target.value })
							}
						/>
					)}{" "}
				</div>

				<HR width={"100%"} height={"1px"} />
				<div className="max-width">
					<div className="flex align-items-center justify-space-between max-width">
						<Title maj small>
							ABOUt me
						</Title>
						{isUser && (
							<EditButton
								onClickEdit={() => setIsEditingAbout(true)}
								onClickCancel={() => {
									setIsEditingAbout(false);
									setNewData({ ...newData, about: description });
								}}
								onClickSave={() => onSaveAbout()}
							/>
						)}{" "}
					</div>
					{!isEditingAbout ? (
						<p className="my-2">{description}</p>
					) : (
						<TextArea
							placeholder={description}
							width={"100%"}
							value={newData.about}
							onChange={(e) =>
								setNewData({ ...newData, about: e?.target?.value })
							}
						/>
					)}{" "}
				</div>
			</div>{" "}
		</Box>
	);
};
