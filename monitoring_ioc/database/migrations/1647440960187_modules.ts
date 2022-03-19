import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Modules extends BaseSchema {
  protected tableName = 'modules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table
      .integer('type')
      .unsigned()
      .references('details.id')
      table.string('location')
      table.float('current_value').nullable()
      table.boolean('current_state')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('active').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}