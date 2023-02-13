
const paginatedResults = (dataArr) => {
  return (req, res, next) => {
    // be sure we have an array:
    const dataArr = Array.from(req.customData);

    

    // localhost/products?page=2&limit=5
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);

    const startInx = (page - 1) * limit;
    const endInx = page * limit;


    // calculate total number of pages.
    let totalPages = 0;
    let full = Math.floor(dataArr.length / limit);
    let remainder = dataArr.length % limit;
    // 21 / 5 = 4 and 1 remainder.
    totalPages = full + (remainder > 0 ? 1 : 0); 


    // pagination object with: reslutArr, next, previous
    const pagObj = {}

    pagObj.results = dataArr.slice(startInx, endInx);
    // console.log('=====================================');
    // console.log(dataArr);
    // next page
    // if: last page => don't send a next page.
    if (endInx < dataArr.length) {
      pagObj.next = {
        page: page + 1,
        limit: limit
      }
    }

    // previous page
    // do not send a previous page -: if: already on page 1
    if (startInx > 0) {
      pagObj.prev = {
        page: page - 1,
        limit: limit
      }
    }

    pagObj.total = totalPages;


    
    // response:
    return res.status(200).json(pagObj);

    // next();
  }
}

export default paginatedResults;