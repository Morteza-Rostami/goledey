import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useEffect } from 'react';

const SelectDrop = ({ 
  options, 
  name, 
  data, 
  setData, 
  defId 
}) => {
  const [pick, setPick] = React.useState('');

  const handleChange = (event) => {
    const aName = event.target.name;
    const value = event.target.value;
    setPick(value);

    setData(c => ({...c, [aName]: value}));
  };

  // set the user.city
  useEffect(() => {
    if (defId) {
      setPick(defId);
    }
  }, [options]);



  console.log('option', options);
  console.log(pick)
  

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={pick}
          label={'شهرستان'}
          name={name}
          onChange={handleChange}
        >
          
          {
            options?.length
            ? (
              options.map(option => {
                console.log('______*************************', option)

                return (
                  <MenuItem 
                  value={option._id} 
                  key={option._id}
                  >
                    { option.name }
                  </MenuItem>
                )
              })
            )
            : ''
          }
          
         
        </Select>
      </FormControl>
      
    </div>
  );
}

export default SelectDrop;


/* {<FormHelperText>With label + helper text</FormHelperText>} */