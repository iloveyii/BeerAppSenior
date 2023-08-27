import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import Pagination from './pagination';
import TypeSelect from '../../components/Select';
import {BeerBar} from '../../components/BeerBar';
import { BeerSearch } from '../../components/BeerSearch';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerSliced, setBeerSliced] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          
          <BeerBar beerSliced={beerList} setBeerSliced={setBeerList}>
            <>
              <TypeSelect beerList={beerList} setBeerList={setBeerList} />
              <BeerSearch beerList={beerList} setBeerList={setBeerSliced}/>
            </>
          </BeerBar>
          <List>
            {beerSliced && beerSliced.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
          <Pagination beerList={beerList} setSliced={setBeerSliced} />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
