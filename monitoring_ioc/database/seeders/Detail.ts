import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Detail from 'App/Models/Detail'

export default class DetailSeeder extends BaseSeeder {
  public async run () {
    
    await Detail.createMany([
      {
        type_name: "Température",
        unit: " °C"
      },
      {
        type_name: "Comptage",
        unit: " personnes"
      },
      {
        type_name: "Vitesse",
        unit: " km/h"
      }
    ])
  }
}
