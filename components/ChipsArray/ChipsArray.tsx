import { CloseOutlined } from '@mui/icons-material';
import { Chip, ChipProps } from '@mui/material';

interface CustomChipProps extends ChipProps {
  selectLabel: string;
  chips: Array<string>;
  handleDelete: (selectLabel: string, chipToDelete: string) => void;
}

export const ChipsArray = ({ selectLabel, chips, handleDelete }: CustomChipProps) => {
  return (
    <>
      {chips.map((data, i) => {
        return (
          <li key={i}>
            <Chip
              variant="outlined"
              label={data}
              onDelete={() => handleDelete(selectLabel, data)}
              deleteIcon={<CloseOutlined />}
              sx={{ borderColor: '#CCD5E0' }}
            />
          </li>
        );
      })}
    </>
  );
};
