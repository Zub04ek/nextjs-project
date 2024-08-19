"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const inter = Inter({
	weight: ["300", "400", "500", "700"],
	variable: "--font-inter",
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
						border: 'none',
					},
				},
			},
		},
	},
});

export default theme;
