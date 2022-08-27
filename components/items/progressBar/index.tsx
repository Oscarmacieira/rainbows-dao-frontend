import * as React from "react";
import LinearProgress, {
	LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const ProgressBar = (props: LinearProgressProps & { value: number }) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<p>{`${Math.round(props.value)}%`}</p>
			</Box>
		</Box>
	);
};
