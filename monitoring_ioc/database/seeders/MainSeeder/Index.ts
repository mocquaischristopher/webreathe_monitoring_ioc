import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
   
    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../Details'))
    await this.runSeeder(await import('../Modules'))
    await this.runSeeder(await import('../Logs'))
  }
}