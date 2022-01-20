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

  static async updateByPk(){


    await this.client.query(`UPDATE "things" 
    SET "body" = 'new body', "updatedAt" = CURRENT_TIMESTAMP,
    WHERE "id"= 1;`)
  };

  static async deleteByPk(value){
    const {rows} = await this.client.query(`DELETE FROM ${this.tableName} WHERE "id" = ${value} RETURNING *;`);
    return rows;
  };
}
//тут описано как общаться с таблицей 

module.exports = Thing;