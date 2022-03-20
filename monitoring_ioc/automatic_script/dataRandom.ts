// import Module from 'App/Models/Module';
const Db = require("@ioc:Adonis/Lucid/Database")
import { DateTime } from "luxon"
import randomValue from "./randomValue"

async function dataRandom() {
    await Db.from('modules').select('*').whereNotNull('active').orderBy('id', 'asc')
        .then((res) => res)
        .then(async(result) =>  {

            for(const module of result){
                const randValue = randomValue(module.type)
                dataModule(module, randValue)
                dataLog(module, randValue)
            }
        })
}
async function dataModule(module, randValue) {
    Db
    .from('modules')
    .where('id', module.id)
    .update({
        current_value: randValue,
        current_state: true,
    })

}

async function dataLog(module, randValue) {
    Db
    .table('logs')
    .insert({
        module_id: module.id,
        value: randValue,
        state: true,
        updated_at: DateTime.now()
    })
}
export default dataRandom;