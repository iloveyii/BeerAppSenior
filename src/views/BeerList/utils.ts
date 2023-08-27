import { filterBeerListByType, getBeerList, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const response = await getBeerList();
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchDataByType = (setData: (data: Array<Beer>) => void, by_type: string) => {
  (async()=>{
    try {
      const resonse = await filterBeerListByType(by_type);
      setData(resonse.data);
    } catch (error) {
      handle(error);
    }
  })();
}
 
export { fetchData, fetchDataByType };
