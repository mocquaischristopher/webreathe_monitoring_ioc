import { DateTime } from 'luxon';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Module from 'App/Models/Module'
import Detail from 'App/Models/Detail';
import Database from '@ioc:Adonis/Lucid/Database';
import randValue from 'automatic_script/randomValue';
import getUptimeList from 'automatic_script/getUptimeList';
// import msToTime from 'automatic_script/msToTime';


export default class MonitoringController {


    dashboard = async ({ view }: HttpContextContract) => {
        let modulesList = await (Database.from('modules').select('*').orderBy('id', 'asc')) 
        let uptimeList = await (Database.from('modules').select('id', 'active').orderBy('id', 'asc')) 
        let logsList = await (Database.from('logs').select('module_id', 'value', 'updated_at').whereNotNull('value').orderBy('module_id', 'asc'))
        let nbValue = await (Database.from('logs').select('module_id').count('value').groupBy('module_id').orderBy('module_id', 'asc')) 
        const typeArray = await Detail.all()
        return view.render('app/home', {modules: modulesList, type: typeArray, nbValue: nbValue, uptimeList:getUptimeList(uptimeList), logsList:logsList})
    }

    oneModule= async ({params, view}:HttpContextContract)=>{
        const module = await Module.findOrFail(params.id)
        const logs = await (Database
            .from('logs')
            .where('module_id', module.id).orderBy('updated_at', 'desc')
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
        return view.render('app/createModuleForm', {types:typeArray})
    }

    createModule=async({request,response, session}:HttpContextContract)=>{
        let newModule=request.body() 
        const randomValue = randValue(+newModule.type);
        const newModuleId = await Database
        .table('modules')
        .insert({
            name: newModule.name,
            type: newModule.type,
            location: newModule.location,
            current_state: newModule.state?true:false,
            current_value: newModule.state?randomValue:null,
            created_at: DateTime.now(),
            active: DateTime.now()
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
        const randomValue = randValue(module.type);
        await Database
            .from('modules')
            .where('id', module.id)
            .update({
                current_state: !module.current_state,
                current_value: !module.current_state?randomValue:null,
                active: !module.current_state?DateTime.now():undefined
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