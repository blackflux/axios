import axios from 'axios';
import { Retainer } from 'object-fields';

export default async (...kwargs) => {
  try {
    return await axios(...kwargs);
  } catch (e) {
    Retainer([
      'code',
      'config.{headers,method,url,data}',
      'response.{headers,status,statusText,data}'
    ])(e);
    throw e;
  }
};
