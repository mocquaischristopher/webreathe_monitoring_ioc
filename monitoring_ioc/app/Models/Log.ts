import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public module_id: number

  @column()
  public value: number | null

  @column()
  public state: boolean

  @column.dateTime({ autoCreate: true })
  public updated_at: DateTime
}
