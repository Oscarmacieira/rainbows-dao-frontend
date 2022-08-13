import styled from "styled-components";
export const LogoIconStyle = styled.img`
	width: ${(props) =>
		props?.small ? "30px" : props?.medium ? "60px" : "100px"};
`;
