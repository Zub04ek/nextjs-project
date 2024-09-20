import { Paper, InputBase, IconButton } from "@mui/material";
import { Search, CloseOutlined } from "@mui/icons-material";
import { SetStateAction } from "react";

interface SearchBarProps {
	searchValue: string;
	setValue: (value: SetStateAction<string>) => void;
}

export const SearchBar = ({ searchValue, setValue }: SearchBarProps) => {
	return (
		<Paper
			component="form"
			className="bg-white transition-all ease-in-out duration-300 border-2 border-transparent hover:border-[#111111] focus-within:border-[#111111]"
			sx={{
				pr: "2px",
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
				<Search sx={{ color: "#75818F" }} />
			</IconButton>
			<InputBase
				sx={{ flex: 1, fontWeight: 500 }}
				placeholder="Search"
				value={searchValue}
				onChange={e => setValue(e.target.value)}
				inputProps={{ "aria-label": "search" }}
			/>
			{searchValue.length > 0 && (
				<IconButton
					type="button"
					sx={{ p: "8px" }}
					aria-label="clear"
					onClick={() => setValue("")}
				>
					<CloseOutlined fontSize="small" sx={{ color: "#111111" }} />
				</IconButton>
			)}
		</Paper>
	);
};
