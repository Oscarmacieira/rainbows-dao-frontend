import LogoIcon from "../../branding/logo/icon/index";
import { HeaderStyle, UnitBalanceBox } from "./style";
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
import { useUnitBalance } from "../../../hooks/UnitToken/useUnitBalance";
import { useMintUnit } from "../../../hooks/UnitToken/useMintUnit";
import { toast } from "react-toastify";
export default function Header({ changeTheme, selectedTheme }) {
	const { login, disconnect } = useConnect();
	const { isAuthenticated, user, account, refetchUserData } = useMoralis();
	const { goToProfile, goToNewLoop } = useAppNavigation();
	const { userDetail, getUserDetail, unitBalance } = useContext(UserContext);
	const { getUnitBalance } = useUnitBalance();
	const { mintUnitToken } = useMintUnit({ amount: 2000 });
	useEffect(() => {
		getUserDetail();
		getUnitBalance();
	}, [user, account]);

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
						autoOpen={true}
						opener={
							<div className="flex align-items-center">
								<UnitBalanceBox>{unitBalance} $UNIT</UnitBalanceBox>
								<AvatarPic
									size="medium"
									imgSrc={userDetail?.avatar}
									cursor={"pointer"}
								/>
							</div>
						}
						height="fit-content"
					>
						<>
							<Link href={`${goToProfile(userDetail?.wallet)}`}>
								<Title clickable small>
									Profile
								</Title>
							</Link>{" "}
							<Link href={`${goToNewLoop()}`}>
								<Title clickable small>
									Create a Loop
								</Title>
							</Link>{" "}
							<hr />
							<Title
								clickable
								small
								onClick={() => {
									navigator.clipboard.writeText(userDetail?.wallet);
									toast.success(
										`Wallet address copied! Opening faucet page to a new tab!`
									);
									setTimeout(function () {
										window.open("https://faucet.polygon.technology/", "_blank");
									}, 3000);
								}}
							>
								Claim Testnet $MATIC
							</Title>
							<Title clickable small onClick={() => mintUnitToken()}>
								Mint $UNIT
							</Title>
							<hr />
							<Title clickable small onClick={() => disconnect()}>
								Log out
							</Title>
						</>
					</PopperEmpty>
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
