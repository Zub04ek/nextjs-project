import { Chip, ChipProps } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

interface ChipData {
	key: number;
	label: string;
}

type CustomChipProps = ChipProps & {
	chipsArray: ChipData[];
	handleDelete: Function;
};

export default function ChipsArray({
	chipsArray,
	handleDelete,
}: CustomChipProps) {
	return (
		<>
			{chipsArray.map(data => {
				return (
					<li key={data.key}>
						<Chip
							variant="outlined"
							label={data.label}
							onDelete={handleDelete(data)}
							deleteIcon={<CloseOutlined />}
						/>
					</li>
				);
			})}
			<li key="all">
				{chipsArray.length > 1 && (
					<Chip
						variant="outlined"
						label="Clear all"
						color="error"
						onDelete={handleDelete({key:-2, label: "all"})}
						deleteIcon={<CloseOutlined />}
					/>
				)}
			</li>
		</>
	);
}
