import { createGlobalStyle } from "styled-components";
import colors from "../theme/styles/colors";
import spacing from "../theme/styles/spacing";

export const AppStyles = createGlobalStyle`

  @font-face {
    font-family: "MADE-Sunflower";
    src: url("./fonts/MADE-Sunflower.otf");
    font-style: normal;
    font-display: swap;
    font-weight:normal;
  }

  @font-face {
    font-family: "Zabal Light";
    src: url("./fonts/Zabal-Light.otf");
    font-style: normal;
    font-display: swap;
    font-weight:300;
  }
 
  @font-face {
    font-family: "Zabal Light";
    src: url("./fonts/Zabal-LightItalic.otf");
    font-style: italic;
    font-display: swap;
    font-weight:300;
  }

  @font-face {
    font-family: "Zabal Regular";
    src: url("./fonts/Zabal-Regular.otf");
    font-style: normal;
    font-display: swap;
    font-weight:normal;
  }
  
  @font-face {
    font-family: "Zabal Regular";
    src: url("./fonts/Zabal-Italic.otf");
    font-style: italic;
    font-display: swap;
    font-weight:normal;
  }

  @font-face {
    font-family: "Zabal Bold";
    src: url("./fonts/Zabal-Bold.otf");
    font-style: normal;
    font-display: swap;
    font-weight:500;
  }
  
  @font-face {
    font-family: "Zabal Bold";
    src: url("./fonts/Zabal-BoldItalic.otf");
    font-style: italic;
    font-display: swap;
    font-weight:500;
  }

  * {
    box-sizing: border-box;
    font-family: "Zabal Regular", sans-serif !important;
  }

 body {
    background: ${({ theme }) => theme.palette.background};
    color: ${({ theme }) => theme.palette.primary};
    transition: all 0.50s linear;
    margin: 0;
    padding: 0;
  }

  hr {
  }

  p,h1,h2,h3,h4,h5,h6 {
      margin:3px;
  }

  b{
    font-weight: bold ;
  }

  a {
    color: ${({ theme }) => (theme as any).colors.link.text};
    cursor: pointer;
    text-decoration: none;
  }

   h1 {
    margin: 10px;
    font-family: "MADE-Sunflower" !important;
  }

  a,
  button,
  i,
  input {
    transition: all 0.2s ease-in 0s;
  }

  button:hover {
    cursor: pointer;
  }

  .icon {
    color: ${({ theme }) => theme.palette.primary};
  }

  ${["center", "left", "right", "justify"].map(
		(typo) => `.text-${typo} { text-align: ${typo}; }`
	)}
  
  ${[
		"center",
		"flex-start",
		"flex-end",
		"space-around",
		"space-between",
		"space-evenly",
	].map((type) => `.justify-${type} { justify-content: ${type}; }`)}

   ${["center", "start", "end", "stretch", "baseline", "normal"].map(
			(type) => `.align-items-${type} { align-items: ${type}; }`
		)}



  ${colors}
  ${spacing}

  .flex {
    display: flex;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .flex-desktop {
    display: flex;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .flex-mobile {
    display: block;
    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between;
    }
  }

  .desktop-only{
	display:flex;
	  @media (max-width: 768px) {
  	     display: hidden;
          }
    }


  .scale {
    cursor: pointer;
    animation: ease-in;
    width: fit-content;
    height: fit-content;
    	&:hover{
      		opacity: 0.6;
      		transform: scale(1.07);
    	}
  }

  .center {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }

  .rainbow-background {
background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%);
    color: white;
  }

  .max-width {
    width:100%;
  }

  .fit-width {
    width: fit-content;
  }

  .hover-btn {
    cursor:pointer;
    animation: 0.2s ease-in-out;
    &:hover {
      opacity: 0.6;
      transform: scale(1.08);
  }
  }

  .lightGreen{
    color: ${({ theme }) => theme.palette.lightGreen};
  }
  .red {
    color: ${({ theme }) => theme.palette.red};
  }

  .fg1 {

    background: ${({ theme }) => theme.palette.foreground1};
  }

  .fg2 {
    background:${({ theme }) => theme.palette.foreground2};
  }


 // #w3a-container {
 //	#w3a-modal {
 // 	z-index:1000000;
  //  	 background:rgb(0 0 0 / 75%);
 //  	}
// 
 // 	 #w3a-modal .w3a-modal__inner.w3a-modal__inner--active {
   //  		border-radius: 20px;
   // 		opacity: 1;
    	// 	transition: 200ms cubic-bezier(0.25, 0.8, 0.25, 1);
    	// 	transform-origin: center center;
		//  border: 1px solid ${({ theme }) => theme.palette.primary};
		 // background:red;
    	// 	::-webkit-scrollbar {
 	// 		width:0px !important;
 	// 	}
	// 	.w3a-modal__content {
    	// 		padding: 30px 34px;
	// background: ${({ theme }) => theme.palette.foreground1};
	// color: ${({ theme }) => theme.palette.primary};
	// 	}
	// 	.w3a-modal__header {
	// background: ${({ theme }) => theme.palette.foreground1};
	// color: ${({ theme }) => theme.palette.primary};
	// .w3a-modal {
	// background: ${({ theme }) => theme.palette.foreground1};
	// color: ${({ theme }) => theme.palette.primary};
	
 // }
	
 // }

	// }
}
`;
