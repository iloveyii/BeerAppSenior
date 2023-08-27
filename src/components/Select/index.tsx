import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Beer } from '../../types';
import { useEffect } from 'react';
import { fetchData, fetchDataByType } from '../../views/BeerList/utils';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'ALL',
  'Micro', 
  'Nano',
  'Regional',
  'Brewpub',
  'Large',
  'Planning',
  'Bar',
  'Contract',
  'Proprietor',
  'Closed',
];

const TypeSelect: React.FC<{beerList: Beer[], setBeerList: any}> = ( {beerList, setBeerList} ) => {
  const [typeName, setTypeName] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent<typeof typeName>) => {
    const {
      target: { value },
    } = event;
    setTypeName(
      value
    );
  };

  useEffect(()=> {
    if(typeName && typeName.length > 0) {
      (async() => {
        if(typeName === 'ALL') {
          fetchData((data: Beer[])=> {
            setBeerList([...data])
          })
        } else {
          fetchDataByType((data: Beer[])=> {
            setBeerList([...data])
          }, typeName.toLocaleLowerCase())
        }
        
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeName])


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} size='small'>
        <InputLabel id="demo-multiple-checkbox-label">Brewery type</InputLabel>
        <Select
          labelId="multiple-brewery-types"
          id="select-multiple-brewery-types"
          value={typeName}
          onChange={handleChange}
          input={<OutlinedInput label="Brewery type" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={typeName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default TypeSelect;