import { Chip, ChipProps } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

type CustomChipProps = ChipProps & {
  group: string;
  chipsArray: Array<string>;
  handleDelete: (group: string, chipToDelete: string) => void;
};

export const ChipsArray = ({ group, chipsArray, handleDelete }: CustomChipProps) => {
  return (
    <>
      {chipsArray.map((data, i) => {
        return (
          <li key={i}>
            <Chip
              variant="outlined"
              label={data}
              onDelete={() => handleDelete(group, data)}
              deleteIcon={<CloseOutlined />}
              sx={{ borderColor: '#CCD5E0' }}
            />
          </li>
        );
      })}
    </>
  );
};
