import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Log from 'App/Models/Log'

export default class LogsSeeder extends BaseSeeder {
  public async run () {
    await Log.createMany([
      {
        module_id: 1,
        value: null,
        state: false,
      },
      {
        module_id: 2,
        value: 25,
        state: true,
      },
      {
        module_id: 3,
        value: 25,
        state: true,
      },
      {
        module_id: 4,
        value: 14.8,
        state: true,
      },
      {
        module_id: 5,
        value: null,
        state: false,
      },
      {
        module_id: 6,
        value: 25,
        state: true,
      },
      {
        module_id: 7,
        value: null,
        state: false,
      },
      {
        module_id: 8,
        value: 25,
        state: true,
      },
      {
        module_id: 9,
        value: null,
        state: false,
      },
      {
        module_id: 10,
        value: 14,
        state: true,
      },
      {
        module_id: 11,
        value: 45.7,
        state: true,
      },
      {
        module_id: 12,
        value: 25,
        state: true,
      },
      {
        module_id: 13,
        value: null,
        state: false,
      },
      {
        module_id: 14,
        value: 5.7,
        state: true,
      },
      {
        module_id: 15,
        value: null,
        state: false,
      },
    ]) 
  }
}
