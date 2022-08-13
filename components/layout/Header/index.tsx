import LogoIcon from "../../branding/logo/icon/index";
import { HeaderStyle } from "./style";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "../../../theme/theme";
import themes from "../../../theme/schema";
import { Button } from "../../items/buttons/style";
import { useConnect } from "../../../hooks/useConnect";
import { useMoralis } from "react-moralis";
import AvatarPic from "../../core/avatar/index";
import { PopperEmpty } from "../../items/popper/index";
import { Title } from "../../items/typography/Title/index";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import Link from "../../../node_modules/next/link";
import { UserContext } from "../../../contexts/UserContextProvider";
export default function Header({ changeTheme, selectedTheme }) {
	const { login, disconnect } = useConnect();
	const { isAuthenticated, user, account, refetchUserData } = useMoralis();
	const { goToProfile } = useAppNavigation();
	const { userDetail, getUserDetail } = useContext(UserContext);
	useEffect(() => getUserDetail(), [user]);

	return (
		<HeaderStyle>
			<Link href={"/"}>
				<div
					className="flex align-items-center"
					style={{ gap: 10, cursor: "pointer" }}
				>
					<LogoIcon size="medium" />
					<h1>Rainbows DAO</h1>
				</div>
			</Link>{" "}
			<div className="flex align-items-center" style={{ gap: 10 }}>
				<IconButton>
					{selectedTheme.name === "Light" ? (
						<DarkModeIcon onClick={changeTheme} className="icon" />
					) : (
						<LightModeIcon onClick={changeTheme} className="icon" />
					)}{" "}
				</IconButton>
				{isAuthenticated && user && account ? (
					<PopperEmpty
						opener={<AvatarPic size="medium" imgSrc={userDetail?.avatar} />}
						children={
							<>
								<Link href={`${user?.get("ethAddress")}`}>
									<Title clickable small>
										Profile
									</Title>
								</Link>{" "}
								<Title clickable small>
									Dashboard
								</Title>
								<hr />
								<Title clickable small>
									Claim Testnet Matic
								</Title>
								<hr />
								<Title clickable small onClick={() => disconnect()}>
									Log out
								</Title>
							</>
						}
						height="fit-content"
					/>
				) : (
					<Button outline onClick={() => login()}>
						Connect
					</Button>
				)}
			</div>
			<div className="line rainbow-background"></div>
		</HeaderStyle>
	);
}
