import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
// import { createTheme } from '@mui/material/styles';
// import { getTypes, getTypesAction } from '../../../redux/actions/ClubActions';
import { setFilteredClubs } from '../../../redux/actions/selectedClubIdActions';

export default function SelectMUI({ isRender, setIsRender }) {
  const clubs = useSelector((store) => store.clubs);
  const dispatch = useDispatch();
  const [type, setType] = useState('');
  const handleChange = (event) => {
    setIsRender(false);
    setType(event.target.value);
    if (event.target.value === 0) {
      dispatch(setFilteredClubs(clubs));
    } else {
      const selectedClubs = clubs?.filter((club) => club?.Types[0]?.id === event.target.value);
      console.log('CHOSEN', selectedClubs);
      dispatch(setFilteredClubs(selectedClubs));
    }
  };

  return (
    <Box sx={{
      minWidth: 200,
      color: 'theme.palette.primary.light',
      borderColor: 'theme.palette.primary.light',
    }}
    >
      <FormControl fullWidth error>
        <InputLabel id="demo-simple-error-label">Направление</InputLabel>
        <Select
          style={{
            color: 'white',
            fontSize: '20px',
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Направление"
          onChange={handleChange}
        >
          <MenuItem value={1}>Пулевая стрельба</MenuItem>
          <MenuItem value={2}>Практическая стрельба</MenuItem>
          <MenuItem value={3}>Стрельба из лука</MenuItem>
          <MenuItem value={4}>Стендовая стрельба</MenuItem>
          <MenuItem value={5}>Пейнтбол</MenuItem>
          <MenuItem value={6}>Пулевая стрельба для детей</MenuItem>
          <MenuItem value={0}>Все типы</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
