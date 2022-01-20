class Think{
  static client = null;
  static tableName = 'Things';
  static attributes = {
    body: 'test'
  }

  static async create(values){
    const insertAttrs = Object.entries(attributes)
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

    const {rows} = await;

  };

  static async readAll(){
    const {rows} = await this.client.query(`SELECT * FROM ${this.tableName};`);
    return rows;
  };
  static async readByPk(value){
    const {rows} = await this.client.query(`SELECT * FROM ${this.tableName} WHERE "id" = ${value};`);
    return rows;
  };

  static async updateByPk(){};

  static async deleteByPk(value){
    const {rows} = await this.client.query(`DELETE FROM ${this.tableName} WHERE "id" = ${value} RETURNING *;`);
    return rows;
  };
}
//тут описано как общаться с таблицей 

module.exports = Think;