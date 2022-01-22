class Thing{
  static client = null;
  static tableName = 'things';
  static attributes = {
    body: 'test'
  }

  static async create(values){
    const insertAttrs = Object.entries(this.attributes)
    .filter(([attr])=>attr in values)
    .map(([attr])=>attr);

    const insertStrAttr = insertAttrs
    .map(attr=> `"${attr}"`)
    .join(',');

    const insertStrValues = insertAttrs
    .map(attr=> {
      const value = values[attr];
      return typeof value === 'string'? `'${value}'`:value;
    })
    .join(',');

    const {rows} = await this.client.query(`INSERT INTO  ${this.tableName} (${insertStrAttr}) VALUES (${insertStrValues}) RETURNING *;`);
    return rows;
  };

  static async readAll(){
    const {rows} = await this.client.query(`SELECT * FROM ${this.tableName};`);
    return rows;
  };
  static async readByPk(value){
    const {rows} = await this.client.query(`SELECT * FROM ${this.tableName} WHERE "id" = ${value};`);
    return rows;
  };

  static async updateByPk(valuePk, values){
    
    // const now = new Date(); 
    const insertAttrs = Object.entries(values)
      .filter(([attr])=>attr in attributes)
      .map(([key,value])=>(
        typeof value==='boolean' || typeof value === 'number')?
        `"${key}" = ${value}`: 
        `"${key}" = '${value}'`);
  
    const getString = insertAttrs
    .join(', ');

    const {rows} = await this.client.query(`UPDATE "${this.tableName}" 
    SET ${getString}, "updatedAt" = CURRENT_TIMESTAMP,
    WHERE "id"= ${valuePk}
    RETURNING *;`);
    return rows;
  };

  static async deleteByPk(value){
    const {rows} = await this.client.query(`DELETE FROM "${this.tableName}" WHERE "id" = ${value} RETURNING *;`);
    return rows;
  };
}
//тут описано как общаться с таблицей 

module.exports = Thing;