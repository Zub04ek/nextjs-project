import { Chip, ChipProps } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

type CustomChipProps = ChipProps & {
	chipsArray: Array<string>;
	handleDelete: Function;
};

export const ChipsArray = ({ chipsArray, handleDelete }: CustomChipProps) => {
	return (
		<ul className="min-h-8 flex gap-2 flex-wrap items-center">
			{chipsArray.map((data, i) => {
				return (
					<li key={i}>
						<Chip
							variant="outlined"
							label={data}
							onDelete={handleDelete(data)}
							deleteIcon={<CloseOutlined />}
							sx={{ borderColor: "#CCD5E0" }}
						/>
					</li>
				);
			})}
			{chipsArray.length > 0 && (
				<li>
					<Chip
						variant="outlined"
						label="Clear all"
						color="error"
						onDelete={handleDelete("all")}
						deleteIcon={<CloseOutlined />}
					/>
				</li>
			)}
		</ul>
	);
};
