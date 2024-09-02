import { Chip, ChipProps } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

type CustomChipProps = ChipProps & {
	chipsArray: Array<string>;
	handleDelete: Function;
};

export const ChipsArray = ({
	chipsArray,
	handleDelete,
}: CustomChipProps) => {
	return (
		<>
			{chipsArray.map(data => {
				return (
					<li key={data}>
						<Chip
							variant="outlined"
							label={data}
							onDelete={handleDelete(data)}
							deleteIcon={<CloseOutlined />}
							sx={{borderColor: "#CCD5E0"}}
						/>
					</li>
				);
			})}
			<li key="all">
				{chipsArray.length > 0 && (
					<Chip
						variant="outlined"
						label="Clear all"
						color="error"
						onDelete={handleDelete("all")}
						deleteIcon={<CloseOutlined />}
					/>
				)}
			</li>
		</>
	);
}
