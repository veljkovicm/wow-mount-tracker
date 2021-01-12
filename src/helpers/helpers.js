export const mergeArrayObjects = (arr1, arr2) => {
  return arr1.map((item, i)=> {
    if(item.id === arr2[i].id) {
      //merging two objects
      return Object.assign({},item,arr2[i])
    }
  })
}

export const sortData = (data, field = 'name') => {
  return data.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0));
}