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

import { Paper, InputBase, InputBaseProps, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBarProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export const SearchBar = ({onChange}: SearchBarProps ) => {
	const [search, setSearch] = useState<string>("");
	const debouncedSearch = useDebounce(search);

	useEffect(() => {
		onChange(debouncedSearch)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch])
	
	return (
		<Paper
			component="form"
			className="bg-white transition-all ease-in-out duration-300 border-2 border-transparent hover:border-[#111111] focus-within:border-[#111111]"
			sx={{
				pr: "12px",
				pl: "2px",
				display: "flex",
				alignItems: "center",
				borderRadius: "100px",
				fontWeight: 500,
				lineHeight: 1.5,
				boxShadow: "none",
			}}
		>
			<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon sx={{ color: "#75818F" }} />
			</IconButton>
			<InputBase
				sx={{ flex: 1, fontWeight: 500 }}
				placeholder="Search"
				value={search}
				onChange={e => setSearch(e.target.value)}
				inputProps={{ "aria-label": "search" }}
			/>
		</Paper>
	);
}
