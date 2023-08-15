import axios from 'axios';
import wrap from './util/wrap.js';

const axiosWrapped = (() => {
  const axiosClone = axios.create();

  const keys = Object.keys(axios);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (!(key in axiosClone)) {
      axiosClone[key] = axios[key];
    }
  }

  const result = wrap(axiosClone);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    result[key] = wrap(axiosClone[key]);
  }

  result.defaults.headers.post['Content-Type'] = 'application/json';
  result.defaults.headers.put['Content-Type'] = 'application/json';
  result.defaults.headers.patch['Content-Type'] = 'application/json';

  return result;
})();

export default axiosWrapped;
