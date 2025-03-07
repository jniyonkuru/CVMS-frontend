import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerValueProps {
  value: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void;
  label: string;
}

export default function DatePickerValue({ value, handleChange, label }: DatePickerValueProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label={label} 
        value={value} 
        onChange={handleChange} 
      />
    </LocalizationProvider>
  );
}
