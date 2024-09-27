import { Paper, InputBase, IconButton } from '@mui/material';
import { Search, CloseOutlined } from '@mui/icons-material';
import { SetStateAction } from 'react';

interface SearchBarProps {
  searchValue: string;
  setValue: (value: SetStateAction<string>) => void;
}

export const SearchBar = ({ searchValue, setValue }: SearchBarProps) => {
  return (
    <Paper
      component="form"
      className="border-2 border-transparent bg-white focus-within:border-black hover:border-black"
      sx={{
        pr: '2px',
        pl: '2px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '100px',
        fontWeight: 500,
        lineHeight: 1.5,
        boxShadow: 'none',
      }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Search sx={{ color: '#75818F' }} />
      </IconButton>
      <InputBase
        sx={{ flex: 1, fontWeight: 500 }}
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />
      {searchValue.length > 0 && (
        <IconButton
          type="button"
          sx={{ p: '8px' }}
          aria-label="clear"
          onClick={() => setValue('')}
          className="opacity-50 hover:opacity-100"
        >
          <CloseOutlined fontSize="small" className="text-black" />
        </IconButton>
      )}
    </Paper>
  );
};
