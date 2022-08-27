import { Card } from "../../components/items/card/index";
import { HR } from "../../components/items/hr/index";
import { Title } from "../../components/items/typography/Title/index";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { getShortWallet } from "../../utils/shortWallet";
export default function ContractsCard({
	loopAddress,
	plan,
	token,
	governor,
	treasury,
	fundraiser,
	actions,
}) {
	const contracts = [
		{ name: "Loop", address: loopAddress },
		{ name: "Plan", address: plan },
		{ name: "Token", address: token },
		{ name: "Governor", address: governor },
		{ name: "Treasury", address: treasury },
		{ name: "Fundraiser", address: fundraiser },
		{ name: "Actions", address: actions },
	];
	return (
		<Card>
			<Title maj medium className="text-center">
				Contracts
			</Title>
			<HR width={"100%"} height="1px" />
			<table className="max-width">
				<tr>
					<th></th>
					<th></th>
					<th></th>
				</tr>
				{contracts?.map((contract: any, index: any) => (
					<tr key={`contract-${index}`}>
						<td>
							<Title small>{contract.name}</Title>
						</td>
						<td>{getShortWallet(contract?.address)}</td>
						<td>
							<Tooltip title={contract?.address} placement="top" arrow={true}>
								<IconButton
									onClick={() =>
										window.open(
											`https://mumbai.polygonscan.com/address/${contract?.address}`,
											"_blank"
										)
									}
								>
									<InfoIcon className="text-primary" />{" "}
								</IconButton>
							</Tooltip>
						</td>
					</tr>
				))}
			</table>
		</Card>
	);
}
