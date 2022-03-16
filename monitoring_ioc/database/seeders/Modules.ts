import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Module from 'App/Models/Module'
import { DateTime } from 'luxon' 

export default class ModulesSeeder extends BaseSeeder {
  public async run () {

    await Module.createMany([
      {
        name: "MT-1x",
        type: 1,
        location: "Bus 1",
        value: null,
        state: false,
      },
      {
        name: "MT-2x",
        type: 1,
        location: "Bus 2",
        value: 25,
        state: true,
      },
      {
        name: "MT-3x",
        type: 1,
        location: "Bus 3",
        value: 25,
        state: true,
        created_at: DateTime.now()
      },
      {
        name: "MT-4x",
        type: 1,
        location: "Tram 1",
        value: 14.8,
        state: true,
      },
      {
        name: "MT-5x",
        type: 1,
        location: "Tram 2",
        value: null,
        state: false,
        created_at: DateTime.now()
      },
      {
        name: "MC-1x",
        type: 2,
        location: "Bus 1",
        value: 25,
        state: true,
      },
      {
        name: "MC-2x",
        type: 2,
        location: "Bus 2",
        value: null,
        state: false,
      },
      {
        name: "MC-3x",
        type: 2,
        location: "Bus 3",
        value: 25,
        state: true,
        created_at: DateTime.now()
      },
      {
        name: "MC-4x",
        type: 2,
        location: "Tram 1",
        value: null,
        state: false,
      },
      {
        name: "MC-5x",
        type: 2,
        location: "Tram 2",
        value: 14,
        state: true,
        created_at: DateTime.now()
      },
      {
        name: "MV-1x",
        type: 3,
        location: "Bus 1",
        value: 45.7,
        state: true,
      },
      {
        name: "MV-2x",
        type: 3,
        location: "Bus 2",
        value: 25,
        state: true,
      },
      {
        name: "MV-3x",
        type: 3,
        location: "Bus 3",
        value: null,
        state: false,
        created_at: DateTime.now()
      },
      {
        name: "MV-4x",
        type: 3,
        location: "Tram 1",
        value: 5.7,
        state: true,
      },
      {
        name: "MV-5x",
        type: 3,
        location: "Tram 2",
        value: null,
        state: false,
      },
    ]) 
  }
}
