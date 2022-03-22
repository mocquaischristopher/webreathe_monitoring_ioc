// import Module from 'App/Models/Module';
// import Database from "@ioc:Adonis/Lucid/Database";
// import { DateTime } from "luxon";
// import randomValue from "./randomValue";

// function dataRandom() {
//     // const modules = Database.from('modules').select('*').orderBy('id', 'asc');
//     const modules = Module.all()
//     // const randomModule = random

//     const randomValue = randomValue(modules.type);
//     Database
//     .from('modules')
//     .where('id', modules.id)
//     .update({
//         current_state: !modules.current_state,
//         current_value: !modules.current_state?randomValue:null,
//         active: !modules.current_state?DateTime.now():undefined
// })

//     Database
//     .table('logs')
//     .insert({
//         module_id: modules.id,
//         state: !modules.current_state,
//         value: !modules.current_state?randomValue:null,
//         updated_at: DateTime.now()
// })
// }

// export default dataRandom;