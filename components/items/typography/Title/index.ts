import styled from "styled-components";

export const Title = styled.p`
	font-size: ${(props) =>
		props.small
			? "1.3rem"
			: props.medium
			? "1.75rem"
			: props.large
			? "3rem"
			: "2rem"};
	font-weight: bold;

  text-transform: ${(props) => (props.maj ? "uppercase" : "none")};
  animation: 0.4s ease-in-out;
  &:hover {
    cursor: ${(props) => (props.clickable ? "pointer" : "")};
    opacity: ${(props) => (props.clickable ? 0.6 : 1)};
  }
}`;
