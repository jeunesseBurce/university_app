const groupBy = (array, key) =>  {
    let groups = array.reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})

     const values = Object.values(groups);
     return values;
}

export default groupBy;

