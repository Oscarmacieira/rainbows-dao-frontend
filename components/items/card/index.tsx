import styled from "styled-components";

export const Card = styled.section`
  width=${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "fit-content")};
  background: ${(props) =>
		props.fg2
			? props.theme.palette.foreground2
			: props.theme.palette.foreground1};
  padding: 20px;
  border-radius:20px;

`;
