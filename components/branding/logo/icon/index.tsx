import { LogoIconStyle } from "./style";
export default function LogoIcon({ size = "large" }) {
	const alt = "logo-icon";
	const src = "./svg/LogoIcon.svg";
	if (size === "small") {
		return <LogoIconStyle small alt={alt} src={src} />;
	} else if (size === "medium") {
		return <LogoIconStyle medium alt={alt} src={src} />;
	} else {
		return <LogoIconStyle alt={alt} src={src} />;
	}
}
