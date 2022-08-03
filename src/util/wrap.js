import redactAndThrow from './redact-and-throw.js';

const wrap = (v) => {
  if (typeof v !== 'function') {
    return v;
  }
  const fn = (...kwargs) => {
    const r = v(...kwargs);
    if (typeof r === 'function') {
      return Object.assign(wrap(r), r);
    }
    if (typeof r?.then === 'function' && typeof r?.catch === 'function') {
      return r.catch(redactAndThrow);
    }
    return r;
  };
  return fn;
};
export default wrap;
