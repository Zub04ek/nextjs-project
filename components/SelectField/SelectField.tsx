import {
	FormControl,
	Select,
	SelectChangeEvent,
	SelectProps,
	MenuItem,
	Checkbox,
} from "@mui/material";
import { CheckBox, Check } from "@mui/icons-material";
import {
	CheckboxStyles,
	MenuItemStyles,
	MenuProps,
	SelectStyles,
} from "./SelectField.styles";
import { SetStateAction } from "react";

type SelectFieldProps = SelectProps & {
	id: string;
	labelName?: string;
	options: Array<string>;
	selectValue: Array<string> | string;
	setValue: (value: SetStateAction<any>) => void;
};

export const SelectField = (props: SelectFieldProps) => {
	const { id, labelName, options, selectValue, setValue, multiple } = props;

	const transformedValue = (value: string | Array<string>) => {
		return id === "sortBy" && typeof value === "string"
			? value.replace("_", " ")
			: value;
	};

	const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
		const {
			target: { value },
		} = event;

		if (id === "sortBy") {
			setValue(value);
		} else {
			setValue(typeof value === "string" ? value.split(",") : value);
		}
	};

	return (
		<FormControl className="w-full">
			<Select
				id={id}
				multiple={multiple}
				value={transformedValue(selectValue)}
				onChange={handleChange}
				displayEmpty
				renderValue={value => labelName || value}
				className="bg-white transition-all ease-in-out duration-300 hover:bg-[#CCD5E0] focus:bg-[#CCD5E0]"
				sx={SelectStyles}
				MenuProps={MenuProps}
			>
				{options.map(option => {
					const textStyle =
						selectValue.indexOf(option) > -1
							? "[text-shadow:_0_4px_4px_rgba(0,0,0,0.25)]"
							: "";
					return (
						<MenuItem
							key={option}
							value={option}
							sx={MenuItemStyles}
						>
							<Checkbox
								sx={CheckboxStyles(id)}
								checked={selectValue.indexOf(option) > -1}
								checkedIcon={id === "sortBy" ? <Check /> : <CheckBox />}
							/>
							<span className={textStyle}>{transformedValue(option)}</span>
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};