"use client";
import { Inter, Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const inter = Inter({
	weight: ["400", "500", "700"],
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const roboto = Roboto({
	weight: ["400"],
	variable: "--font-roboto",
	subsets: ["latin"],
	display: "swap",
});

const theme = createTheme({
	typography: {
		fontFamily: inter.style.fontFamily,
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					[`& .${outlinedInputClasses.notchedOutline}`]: {
						border: "none",
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					top: "120px !important",
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					[`& .MuiInputBase-input`]: {
						paddingTop: "10px",
						paddingBottom: "10px",
						height: "auto",
						lineHeight: 1.5,
					},
					[`& .MuiInputBase-input::placeholder`]: {
						opacity: 1,
						color: "#75818F",
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontFamily: roboto.style.fontFamily,
					fontSize: "16px",
					fontWeight: 400,
					lineHeight: 1.5,
					color: "#111111",
					['& svg']: {
						width: "16px",
						height: "16px",
					},
					['& .MuiChip-deleteIcon']: {
						color: "#9EAAB8",
					},
					['&.MuiChip-colorError .MuiChip-deleteIcon']: {
						color: "#111111",
					},
				}
			}
		}
	},
});

export default theme;
