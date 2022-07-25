import redactAndThrow from './redact-and-throw.js';

export default (v) => {
  if (typeof v !== 'function') {
    return v;
  }
  return (...kwargs) => {
    const r = v(...kwargs);
    if (typeof r?.then === 'function' && typeof r?.catch === 'function') {
      return r.catch(redactAndThrow);
    }
    return r;
  };
};
