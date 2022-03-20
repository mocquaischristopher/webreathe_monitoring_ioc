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
        current_value: null,
        current_state: false,
        active: undefined,
      },
      {
        name: "MT-2x",
        type: 1,
        location: "Bus 2",
        current_value: 25,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MT-3x",
        type: 1,
        location: "Bus 3",
        current_value: 25,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MT-4x",
        type: 1,
        location: "Tram 1",
        current_value: 14.8,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MT-5x",
        type: 1,
        location: "Tram 2",
        current_value: null,
        current_state: false,
        active: undefined,
      },
      {
        name: "MC-1x",
        type: 2,
        location: "Bus 1",
        current_value: 25,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MC-2x",
        type: 2,
        location: "Bus 2",
        current_value: null,
        current_state: false,
        active: undefined,
      },
      {
        name: "MC-3x",
        type: 2,
        location: "Bus 3",
        current_value: 25,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MC-4x",
        type: 2,
        location: "Tram 1",
        current_value: null,
        current_state: false,
        active: undefined,
      },
      {
        name: "MC-5x",
        type: 2,
        location: "Tram 2",
        current_value: 14,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MV-1x",
        type: 3,
        location: "Bus 1",
        current_value: 45.7,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MV-2x",
        type: 3,
        location: "Bus 2",
        current_value: 25,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MV-3x",
        type: 3,
        location: "Bus 3",
        current_value: null,
        current_state: false,
        active: undefined,
      },
      {
        name: "MV-4x",
        type: 3,
        location: "Tram 1",
        current_value: 5.7,
        current_state: true,
        active: DateTime.now(),
      },
      {
        name: "MV-5x",
        type: 3,
        location: "Tram 2",
        current_value: null,
        current_state: false,
        active: undefined,
      },
    ]) 
  }
}
