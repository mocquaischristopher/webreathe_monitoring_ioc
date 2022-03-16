import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Detail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_name: string
  
  @column()
  public unit: string
}
