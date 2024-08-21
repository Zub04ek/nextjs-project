"use client";

import { useState } from "react";
import {
	FormControl,
	Select,
	SelectChangeEvent,
	SelectProps,
	MenuItem,
	Checkbox,
} from "@mui/material";

type CustomSelectProps = SelectProps & {
	id: string;
	labelName?: string;
	options: Array<string>;
};

export default function SelectField({
	id,
	labelName,
	options,
}: CustomSelectProps) {
	const [selectValue, setSelectValue] = useState<string>("");

	const handleChange = (event: SelectChangeEvent) => {
		setSelectValue(event.target.value);
	};

	return (
		<FormControl className="w-full"
			sx={{
				// minWidth: 227,
			}}
		>
			<Select
				id={id}
				value={selectValue}
				onChange={handleChange}
				displayEmpty={true}
				renderValue={value => value === "" && labelName ? labelName : value}
				// renderValue={value => labelName || value}
				className="bg-white transition-all ease-in-out duration-300 hover:bg-[#CCD5E0] focus:bg-[#CCD5E0]"
				sx={{
					"& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
						py: "12px",
						pl: "20px",
						pr: "12px",
					},
					borderRadius: "100px",
					fontWeight: 500,
					lineHeight: 1.5,
				}}
				MenuProps={{
					PaperProps: {
						sx: {
							// top: "130px",
							borderRadius: "24px",
							boxShadow: "4px 4px 24px 0px #04032329",
							"& .MuiMenuItem-root": {
								gap: "12px",
								px: 2,
								py: "12px",
								fontWeight: 500,
							},
						},
					},
				}}
			>
				{options.map(option => {
					return (
						<MenuItem key={option} value={option}>
							<Checkbox
								sx={{
									"& svg": {
										// stroke: '#9EAAB8',
										fill: "#9EAAB8",
									},
									"&.Mui-checked svg": {
										// stroke: '#9EAAB8',
										fill: "#111111",
									},
									p: 0,
								}}
								checked={selectValue.indexOf(option) > -1}
							/>
							{option}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}
