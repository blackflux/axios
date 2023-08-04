import { Retainer } from 'object-fields';
import axios from 'axios';

const retainer = Retainer([
  'code',
  'config.{headers,method,url,data}',
  'response.{headers,status,statusText,data}'
]);

export default (e) => {
  if (e instanceof axios.AxiosError) {
    retainer(e);
    delete e.stack;
  }
  throw e;
};
