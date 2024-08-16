"use client";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

interface Props {
	id: string;
	labelName: string;
	options: Array<string>;
}

export default function SelectWithLabel({ id, labelName, options }: Props) {
	const [selectValue, setSelectValue] = React.useState("");

	const handleChange = (event: SelectChangeEvent) => {
		const {
			target: { value },
		} = event;
		setSelectValue(value);
	};

	return (
		<FormControl
			sx={{
				m: 1,
				minWidth: 227,

				// to remove label on input click
				// "& .MuiInputLabel-shrink": {
				// 	opacity: 0,
				// 	transition: "all 0.2s ease-in",
				// },
			}}
		>
			<InputLabel id={`${id}-label`} className="leading-6 font-medium">
				{labelName}
			</InputLabel>
			<Select
				// notched={false}
				labelId={`${id}-label`}
				id={id}
				value={selectValue}
				label={labelName}
				onChange={handleChange}
				renderValue={selected => selected}
				className="bg-white font-medium rounded-full transition-all ease-in-out duration-300 hover:bg-[#CCD5E0] focus:bg-[#CCD5E0]"
				sx={{
					"& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
						// py: "12px",
						pl: "20px",
						pr: "12px",
						borderRadius: "50%",
					},
					".MuiOutlinedInput-notchedOutline": {
						border: "none !important",
					},
					".css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
						top: "200px",
					},
				}}
				MenuProps={{
					PaperProps: {
						sx: {
							bgcolor: "white",
							top: "130px !important",
							borderRadius: "24px",
							"& .MuiMenuItem-root": {
								padding: 2,
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
