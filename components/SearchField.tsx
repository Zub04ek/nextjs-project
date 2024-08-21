// import { OutlinedInput, InputBaseProps, FormControl, IconButton } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
// import React from "react";

// export default function SearchField() {
// 	return (
// 		<FormControl>
//             <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//                 <SearchIcon />
//             </IconButton>
// 			<OutlinedInput
// 				placeholder="Search"
// 				className="bg-white transition-all ease-in-out duration-300 border-2 border-transparent hover:border-[#111111] focus:border-[#111111]"
// 				sx={{
// 					"& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
// 						py: "12px",
// 						pl: "20px",
// 						pr: "12px",
// 					},
// 					borderRadius: "100px",
// 					fontWeight: 500,
// 					lineHeight: 1.5,
// 				}}
// 			/>
// 		</FormControl>
// 	);
// }

import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

export default function CustomizedInputBase() {
	return (
		<Paper
			component="form"
            className="bg-white transition-all ease-in-out duration-300 border-2 border-transparent hover:border-[#111111] focus-within:border-[#111111]"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				borderRadius: "100px",
				fontWeight: 500,
				lineHeight: 1.5,
                boxShadow: 'none'
			}}
		>
			<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
			<InputBase
				sx={{ flex: 1 }}
				placeholder="Search"
				inputProps={{ "aria-label": "search google maps" }}
			/>
		</Paper>
	);
}
