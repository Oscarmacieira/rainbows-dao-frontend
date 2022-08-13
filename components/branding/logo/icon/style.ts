import styled from "styled-components";

type Logo = {
	small?: boolean;
	medium?: boolean;
};

export const LogoIconStyle = styled.img<Logo>`
	width: ${(props) =>
		props?.small ? "30px" : props?.medium ? "60px" : "100px"};
`;
