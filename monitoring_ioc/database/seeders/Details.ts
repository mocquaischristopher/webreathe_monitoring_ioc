import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Detail from 'App/Models/Detail'

export default class DetailsSeeder extends BaseSeeder {
  public async run () {
    
    await Detail.createMany([
      {
        type_name: "Temperature",
        unit: " °C"
      },
      {
        type_name: "Counter",
        unit: " persons"
      },
      {
        type_name: "Speed",
        unit: " km/h"
      }
    ])
  }
}
