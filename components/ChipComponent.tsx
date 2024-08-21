"use client";

import { useState } from "react";
import Chip from "@mui/material/Chip";

interface ChipData {
	key: number;
	label: string;
}

export default function ChipsArray() {
	const [chipData, setChipData] = useState<readonly ChipData[]>([
		{ key: 0, label: "Angular" },
		{ key: 1, label: "jQuery" },
		{ key: 2, label: "Polymer" },
		{ key: 3, label: "React" },
		{ key: 4, label: "Vue.js" },
	]);

	const handleDelete = (chipToDelete: ChipData) => () => {
		setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
	};

	return (
		<>
			{chipData.map(data => {
				return (
					<li key={data.key}>
						<Chip
							variant="outlined"
							label={data.label}
							onDelete={handleDelete(data)}
						/>
					</li>
				);
			})}
		</>
	);
}
