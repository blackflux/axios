import axios from 'axios';
import wrap from './util/wrap.js';

const axiosWrapped = Object.entries(axios)
  .map(([k, v]) => [k, wrap(v)])
  .reduce((p, [k, v]) => {
    // eslint-disable-next-line no-param-reassign
    p[k] = wrap(v);
    return p;
  }, wrap(axios));

export default axiosWrapped;
