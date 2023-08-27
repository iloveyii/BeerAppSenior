import { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [beerFiltered, setBeerFiltered] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);
  useEffect(() => {
    setBeerFiltered(beerList);
  }, [beerList]);

  const onChangeFilter = (e:any) => {
    e.preventDefault();
    const list = beerList.filter( b => b.name.toLowerCase().includes(e.target.value));
    setBeerFiltered(list);
  }

  const handleChange = (beer: Beer) => {
    const exists = savedList.find((b: Beer) => b.id === beer.id)
    if (!exists) {
      setSavedList([...savedList, beer]);
    }
  }
  
  const onClearFavourites = () => {
    setSavedList([]);
  }

  const onReloadAll = (e: any) => {
    setBeerList([]);
    fetchData(setBeerList);
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField onChange={(e) => onChangeFilter(e)} label='Filter...' variant='outlined' />
                <Button onClick={onReloadAll} variant='contained'>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerFiltered.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox onChange={() => handleChange(beer)} />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button onClick={onClearFavourites} variant='contained' size='small'>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
