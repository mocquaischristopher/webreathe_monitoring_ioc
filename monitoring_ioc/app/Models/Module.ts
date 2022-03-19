import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Detail from './Detail'
import Log from './Log'

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
  public current_value: number | null

  @column()
  public current_state: boolean

  @hasOne(()=>Detail)
  public type_name:HasOne<typeof Detail>
  
  @hasMany(()=>Log)
  public module_id:HasMany<typeof Log>
  
  @column.dateTime()
  public active: DateTime

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime | null
}
