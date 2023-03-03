
const FrontHelp = {
  
  formatMoney: (currency) => {
    if (currency === 0) return 0;
    const formated = 
    currency
    .toString()
    .split('')
    .reverse()
    .map((v, i, arr) => {
      if ((i + 1) % 3 === 0 && i < arr.length - 1) {
        return `,${v}`;
      } else
        return v;
    })
    .reverse()
    .join('');

    return formated;
  },

  truncate: (text, len) => {
    let subStr = '';
    if (text)
      subStr = text.substring(0, len) + '...';
    return subStr;
  },

  noRepeatedItem: (oldItems, newItems) => {


  
    let items = [];
  
    if (oldItems?.length) {
      items.push(...oldItems)
    
      items.push(...newItems.filter((vl, i) => {
        return vl._id !== items[i]._id;
      }))
    } else {
      items.push(...newItems)
    } 
  
    return JSON.parse(JSON.stringify(items));
  }
}

export default FrontHelp;