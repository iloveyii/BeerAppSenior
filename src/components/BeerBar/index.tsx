import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useState } from 'react';
import { Beer } from '../../types';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#dedede',
    },
  },
});

export const BeerBar: React.FC<{beerSliced: Beer[], setBeerSliced: any, children: ReactJSXElement}> = ( {beerSliced, setBeerSliced, children} ) =>  {

// export default function BeerBar({children}: {children?: ReactJSXElement}) {
  const [sortOrder, setSortOrder] = useState(1);

  const sortList = () => {
    console.log('sorting');
    const list = beerSliced.sort((a:Beer, b:Beer) => {
      if(a.name > b.name) {
        return 1 * sortOrder;
      }
      if(b.name > a.name) {
        return -1 * sortOrder;
      }
      return 0;
    });
    setSortOrder(-1 * sortOrder);
    setBeerSliced([...list]);
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='transparent'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={sortList}
            >
              { sortOrder > 0 
                ? < ArrowDropDownIcon/>
                : < ArrowDropUpIcon/>
              }
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Beer
            </Typography>
            {children}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}