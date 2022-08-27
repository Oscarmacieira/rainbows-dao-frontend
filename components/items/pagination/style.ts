import styled from "styled-components";
import Pagination from "@mui/material/Pagination";

export const PaginationStyled = styled(Pagination)`
	button {
		color: ${({ theme }) => theme.palette.primary};
		.Mui-selected {
			background: blue;
		}
	}
`;
