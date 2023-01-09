import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { getTypes, getTypesAction } from '../../../redux/actions/ClubActions';
import { setClubId } from '../../../redux/actions/selectedClubIdActions';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default function SelectMUI() {
  const dispatch = useDispatch();

  const [type, setType] = useState(null);
  const handleChange = (event) => {
    setType(1);
    console.log('TYPE', event.target.value, type);
    // dispatch(setClubId(type));
    console.log('AGAINTYPE', type);
  };

  return (
    <Box sx={{
      minWidth: 120,
      color: 'theme.palette.primary.light',
      borderColor: 'theme.palette.primary.light',
    }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Направление</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Направление"
          onChange={handleChange}
        >
          {/* {types?.map((el) => <MenuItem value={el.club_type}>{el.club_type}</MenuItem>)} */}
          <MenuItem value={1}>Пулевая стрельба</MenuItem>
          <MenuItem value={2}>Практическая стрельба</MenuItem>
          <MenuItem value={3}>Стрельба из лука</MenuItem>
          <MenuItem value={4}>Стендовая стрельба</MenuItem>
          <MenuItem value={5}>Пейнтбол</MenuItem>
          <MenuItem value={6}>Пулевая стрельба для детей</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
