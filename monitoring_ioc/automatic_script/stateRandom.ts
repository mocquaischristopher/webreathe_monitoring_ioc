import Module from 'App/Models/Module';
import Database from "@ioc:Adonis/Lucid/Database";
import { DateTime } from "luxon";
import randomValue from "./randomValue";

function dataRandom() {
    const modulesIot = Database.from('modules').select('*').orderBy('id', 'asc');
    const randomModule = modulesIot.sort(() => Math.random() - 0.5)

    // const randValue = randomValue(modules.type);
    Database
    .from('modules')
    .where('id', modules.id)
    .update({
        current_state: !modules.current_state,
        current_value: !modules.current_state?randValue:null,
        active: !modules.current_state?DateTime.now():undefined
})

    Database
    .table('logs')
    .insert({
        module_id: modules.id,
        state: !modules.current_state,
        value: !modules.current_state?randValue:null,
        updated_at: DateTime.now()
})
}

export default dataRandom;