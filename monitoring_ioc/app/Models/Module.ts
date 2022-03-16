import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Details from './Detail'
import Logs from './Log'

export default class Module extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: number

  @column()
  public location: string

  @column()
  public value: number

  @column()
  public state: boolean

  @hasOne(()=>Details)
  public type_name:HasOne<typeof Details>

  @hasMany(()=>Logs)
  public module_id:HasMany<typeof Logs>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
