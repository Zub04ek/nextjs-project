import {
	FormControl,
	Select,
	SelectChangeEvent,
	SelectProps,
	MenuItem,
	Checkbox,
} from "@mui/material";
import { CheckBox, Check } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils/createUrl";
import { CheckboxStyles, MenuItemStyles, MenuProps, SelectStyles } from "./SelectField.styles";
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

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const transformedValue = (value: string | Array<string>) => {
		return id === "sortBy" && typeof value === "string" ? value.replace("_", " ") : value;
	};

	const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
		const {
			target: { value },
		} = event;

		const selectedSearchParams = new URLSearchParams(searchParams.toString());
		if (value.length) {
			selectedSearchParams.set(id, value.toString());
		} else {
			selectedSearchParams.delete(id);
		}
		const queryString = createUrl(pathname, selectedSearchParams);
		router.push(queryString);

		// router.push(`${pathname}?${createQueryString(id, value.toString())}`)
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
				// renderValue={value => value === "" && labelName ? labelName : value}
				renderValue={value => labelName || value}
				className="bg-white transition-all ease-in-out duration-300 hover:bg-[#CCD5E0] focus:bg-[#CCD5E0]"
				sx={SelectStyles}
				MenuProps={MenuProps}
			>
				{options.map(option => {
					return (
						<MenuItem
							key={option}
							value={option}
							// onClick={() => router.push(categoryURL, {scroll: false})}
							sx={MenuItemStyles}
						>
							<Checkbox
								sx={CheckboxStyles(id)}
								checked={selectValue.indexOf(option) > -1}
								checkedIcon={id === "sort" ? <Check /> : <CheckBox />}
							/>
							{transformedValue(option)}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};
