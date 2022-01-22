const attributes = {
  body: 'test',
  id : 5
};
const values = {
  body:' test text',
  id :4,
  createdAt :'1990-17-21'
}
const valuePk = 4;

const tableName = 'things';

const updateByPk= function(valuePk, values){
  const now = new Date(); 
  const insertAttrs = Object.entries(values)
    .filter(([attr])=>attr in attributes)
    .map(([key,value])=>(
      typeof value==='boolean' || typeof value === 'number')?
      `"${key}" = ${value}`: 
      `"${key}" = '${value}'`);

  const getString = insertAttrs
  .join(', ');
    
  return (`UPDATE "${tableName}" 
    SET ${getString}, "updatedAt" = ${now},
    WHERE "id"= ${valuePk}
    RETURNING *;`);
  // const getValue =   
}
console.log(updateByPk(valuePk,values));