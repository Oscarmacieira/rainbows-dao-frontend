import { toast } from "react-toastify";

export const useToast = () => {
	const notify = ({
		type = "success",
		message = "Wow, so easy!",
		position = "top-right",
		autoClose = 5000,
	}) => {
		toast[type](message, {
			position: position,
			autoClose: autoClose,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
		});
	};

	return { notify };
};
