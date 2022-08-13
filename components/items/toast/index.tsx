import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const CustomToaster = styled(ToastContainer)`
	.Toastify__toast {
		background: ${({ theme }) => theme.palette.foreground2};
		border: 1px solid ${({ theme }) => theme.palette.secondary};
		border-radius: 5px;
		color: ${({ theme }) => theme.palette.primary};
		-webkit-box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.77);
		box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.77);
	}
	.Toastify__toast-icon--info {
		color: ${({ theme }) => theme.palette.primary};
	}
`;
