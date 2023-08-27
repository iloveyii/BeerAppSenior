import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { Box, Button, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import BadgeIcon from '@mui/icons-material/Badge';
import BusinessIcon from '@mui/icons-material/Business';
import Person3Icon from '@mui/icons-material/Person3';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const Beer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);
  const onBackClick = () => navigate('/beer');

  return (
    <article>
      <section>
        <header>
          <Button onClick={onBackClick} sx={{marginBottom: 5}} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
            Back
          </Button>
        </header>
        <main>

          <ListItemButton>
            <ListItemIcon>
              <SportsBar sx={{ fontSize: 50, marginBottom: 2, marginRight: 2 }} />
            </ListItemIcon>
            <Typography variant="h5" gutterBottom>
              {beer?.name}
            </Typography>
          </ListItemButton>

          <Box sx={{ marginLeft: 2 }}>
            <ListItemButton>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary={beer?.brewery_type} />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={beer?.address_1} />
            </ListItemButton>

            <ListItemButton>  
              <ListItemIcon>
                <Person3Icon />
              </ListItemIcon>
              <ListItemText primary={beer?.name} />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <PhoneAndroidIcon />
              </ListItemIcon>
              <Link href={'tel:' + beer?.phone}>
                  <ListItemText primary={beer?.phone} />
                </Link>
            </ListItemButton>

            {
              beer?.website_url && 
              <ListItemButton>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <Link href={beer?.website_url}>
                  <ListItemText primary={beer?.website_url} />
                </Link>
              </ListItemButton>
            }
          </Box>
          
        </main>
      </section>
    </article>
  );
};

export default Beer;
