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
import { SelectFieldProps } from "@/utils/types";
import { useMemo } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			borderRadius: "24px",
			boxShadow: "4px 4px 24px 0px #04032329",
		},
	},
};
const SelectStyles = {
	"& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
		py: "12px",
		pl: "20px",
		pr: "12px",
	},
	borderRadius: "100px",
	fontWeight: 500,
	lineHeight: 1.5,
};
const MenuItemStyles = {
	gap: "12px",
	px: 2,
	py: "12px",
	fontWeight: 500,
	"&.Mui-selected": {
		backgroundColor: "transparent",
	},
	"&.Mui-focusVisible": {
		backgroundColor: "transparent",
	},
};
const CheckboxStyles = (id: string) => [
	{
		"& svg": {
			fill: "#9EAAB8",
		},
		"&.Mui-checked svg": {
			fill: "#111111",
		},
		p: 0,
	},
	id === "sort" && {
		"& svg": {
			fill: "transparent",
		},
	},
];

export const SelectField = (props: SelectFieldProps & SelectProps) => {
	const { id, labelName, options, selectValue, setValue, multiple } = props;

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const transformedValue = (value: string | Array<string>) => {
		return id === "sortBy" && typeof value === "string" ? value.toLowerCase().replace("_", " ") : value;
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
		// setSelectValue({id: value });
	};

	return (
		<FormControl className="w-full">
			<Select
				id={id}
				multiple={multiple}
				value={transformedValue(selectValue)}
				onChange={handleChange}
				displayEmpty={true}
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
