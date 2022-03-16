import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Details extends BaseSchema {
  protected tableName = 'details'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('type_name')
      table.string('unit')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}