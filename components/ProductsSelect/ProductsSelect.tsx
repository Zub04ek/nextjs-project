import { SetStateAction } from 'react';

import { Check, CheckBox } from '@mui/icons-material';
import {
  Checkbox,
  FormControl,
  MenuItem,
  SelectProps as MuiSelectProps,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { CheckboxStyles, MenuItemStyles, MenuProps, SelectStyles } from './ProductsSelect.styles';

type SelectBaseProps = Omit<MuiSelectProps, ''>;

interface SelectFieldProps extends SelectBaseProps {
  id: string;
  labelName?: string;
  options: Array<string>;
  selectValue: Array<string> | string;
  setValue: (value: SetStateAction<any>) => void;
}

export const ProductsSelect = (props: SelectFieldProps) => {
  const { id, labelName, options, selectValue, setValue, multiple } = props;

  const transformedValue = (value: string | Array<string>) => {
    return id === 'sortBy' && typeof value === 'string' ? value.replace('_', ' ') : value;
  };

  const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
    const value = event.target.value;

    if (id === 'sortBy') {
      setValue(value);
    } else {
      setValue(typeof value === 'string' ? value.split(',') : value);
    }
  };

  return (
    <FormControl className="w-full">
      <Select
        id={id}
        multiple={multiple}
        value={transformedValue(selectValue)}
        onChange={handleChange}
        displayEmpty
        renderValue={(value) => labelName || value}
        className="bg-white transition-all duration-300 ease-in-out hover:bg-[#CCD5E0] focus:bg-[#CCD5E0]"
        sx={SelectStyles}
        MenuProps={MenuProps}
      >
        {options.map((option) => {
          const textStyle = selectValue.indexOf(option) > -1 ? '[text-shadow:_0_4px_4px_rgba(0,0,0,0.25)]' : '';
          return (
            <MenuItem key={option} value={option} sx={MenuItemStyles}>
              <Checkbox
                sx={CheckboxStyles(id)}
                checked={selectValue.indexOf(option) > -1}
                checkedIcon={id === 'sortBy' ? <Check /> : <CheckBox />}
              />
              <span className={textStyle}>{transformedValue(option)}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
