import { DateTime } from 'luxon';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Module from 'App/Models/Module'
import Detail from 'App/Models/Detail';
import Database from '@ioc:Adonis/Lucid/Database';


export default class MonitoringController {


    dashboard = async ({ view }: HttpContextContract) => {
        let modulesList = await (Database.from('modules').select('*').orderBy('created_at', 'asc'))
        // let updateTime = await (Database)
        // let nbValue = await (Database.from('logs').select('*').groupBy('value')) module_id = 5
        let modules = await Database.from('modules').where('id', 5).with('toto', (query) => {
            query.from('logs').select('*').where('module_id', 5)}).select('*').from('toto')
        // let modulesList = await (Database
        //     .from('modules')
        //     // .select('*')
            
        //     .join('logs', 'modules.id', '=', 'logs.module_id')
        //     .select('modules.*')
        //     .select('logs.value')
        //     .select('logs.state')
        //     .select('logs.updated_at')
        // )
        // let modulesList = await (Database
        //     .from('modules')
        //     .where('modules_id', Database
        //         .raw(`select "user_id" from "users" where "users"."user_id" = ?`, [1])
        //         .wrap('(', ')')
        //     )
        // )
            console.log(modules)
        const typeArray = await Detail.all()
        return view.render('app/home', {modules: modulesList, type: typeArray})
    }

    oneModule= async ({params, view}:HttpContextContract)=>{
        const module = await Module.findOrFail(params.id)
        const logs = await (Database
            .from('logs')
            .where('module_id', module.id)
            )
        const type = await (Database
            .from('details')
            .select('*')
        )       
    
        return view.render('app/modules', 
        {
            module: module,
            logs: logs,
            type: type
        })
    }

    createModuleForm=async({view}:HttpContextContract)=>{
        let typeArray = await Database.from('details').select('*')
        // let typeArray = await Database.from(Detail.table).select('*')
        return view.render('app/createModuleForm', {types:typeArray})
    }

    createModule=async({request,response, session}:HttpContextContract)=>{
        let newModule=request.body() 
        const randomValue = random(+newModule.type);
        const newModuleId = await Database
        .table('modules')
        .insert({
            name: newModule.name,
            type: newModule.type,
            location: newModule.location,
            current_state: newModule.state?true:false,
            current_value: newModule.state?randomValue:null,
            created_at: DateTime.now()
        }).returning("id")
        await Database
        .table('logs')
        .insert({
            module_id: newModuleId[0].id,
            state: newModule.state?true:false,
            value: newModule.state?randomValue:null,
            updated_at: DateTime.now()
        })

        session.flash({success: "The module has been created"})
        response.redirect().toRoute('home')
    }

    changeState = async ({params, response}:HttpContextContract) => {
        let module = await Module.findOrFail(params.id)
        const randomValue = random(module.type);
        await Database
            .from('modules')
            .where('id', module.id)
            .update({
                current_state: !module.current_state,
                current_value: !module.current_state?randomValue:null
            })
        await Database
            .table('logs')
            .insert({
                module_id: module.id,
                state: !module.current_state,
                value: !module.current_state?randomValue:null,
                updated_at: DateTime.now()
            })
        response.redirect(`/modules/${module.id}`) 
    }

    deleteModule=async({params, response, session}:HttpContextContract)=>{
        let moduleId = await Module.findOrFail(params.id)
        await moduleId.delete()
        await Database
        .from('logs')
        .where('module_id', moduleId.id).delete()
        session.flash({success: "The module has been deleted"})
        response.redirect().toRoute('home')
    }


}
// function formatDate(date: Date) {
//     const d = new Date(date);
//     const day = d.getUTCDate();
//     const month = d.getUTCMonth() + 1;
//     const year = d.getUTCFullYear();

//     // console.log(day, month, year);
//     // console.log(d.toLocaleDateString("fr-FR"));
//     return d.toLocaleDateString("fr-FR");
// }

// function random(min, max) {
function random(type:number) {
    let value = 0.0;
    // return Math.floor(Math.random() * (max - min + 1) + min);
    switch(type) {
        case 1:
            value = randNb(-10, 50);
            break;
        case 2:
            value = Math.floor(randNb(0, 2000));
            break;
        case 3:
            value = randNb(0, 50);
            break;
    }
    return value;
}
function randNb(min, max) {
    // return Math.floor(Math.random() * (max - min + 1) + min);
    return (Math.random() * (max - min + 1) + min).toFixed(1);
}