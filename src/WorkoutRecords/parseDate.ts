import { parse } from 'date-fns';

export default function parseDate(string: string, format = 'dd.MM.yyyy') {
  return parse(string, format, new Date());
}