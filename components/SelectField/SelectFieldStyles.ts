const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;

export const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			borderRadius: "24px",
			boxShadow: "4px 4px 24px 0px #04032329",
		},
	},
};

export const SelectStyles = {
	"& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
		py: "12px",
		pl: "20px",
		pr: "12px",
	},
	borderRadius: "100px",
	fontWeight: 500,
	lineHeight: 1.5,
};

export const MenuItemStyles = {
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

export const CheckboxStyles = (id: string) => [
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