import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Beer } from "../../types";

const pageSize = 10;

const BeerPagination: React.FC<{beerList: Beer[], setSliced: any}> = ( {beerList, setSliced} ) => {
  
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  })

  useEffect(()=> {
    if(beerList && Array.isArray(beerList)) {
      (async() => {
        await setPagination( 
          {...pagination, count: beerList.length}
        )
        pageIt()
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beerList.length, beerList])

  const pageIt = () => {
    const sliced = beerList?.slice(pagination.from, pagination.to)
    setSliced(sliced)
  }

  useEffect(() => {
   pageIt()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.from]);

  const handleChange = (e: any, page: number) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setPagination({...pagination, from, to});
  }

  return (
    <Box 
      alignItems={'center'} 
      justifyContent={'center'}
      display={'flex'}
      mt={2}
    >
      <Pagination 
        onChange={handleChange}
        count={Math.ceil(pagination.count / pageSize)} 
        variant="outlined" 
        color="primary" />
    </Box>
  )
}

export default BeerPagination;