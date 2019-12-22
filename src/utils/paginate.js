import _ from 'lodash';

export function paginate(items , pageNo , pageSize)  {
  const index = (pageNo-1)* pageSize;
  const _items = [...items];
  return   _(_items).splice(index).take(pageSize).value();
}