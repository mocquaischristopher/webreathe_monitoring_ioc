import { DateTime } from 'luxon';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Module from 'App/Models/Module'
import Detail from 'App/Models/Detail';
import Database from '@ioc:Adonis/Lucid/Database';

interface ModuleTimeInterface{
    id:number
    active:string
    current_state:boolean
}

export default class MonitoringController {


    dashboard = async ({ view }: HttpContextContract) => {
        let modulesList = await (Database.from('modules').select('*').orderBy('id', 'asc')) 
        let uptimeList = await (Database.from('modules').select('id', 'active', 'current_state').orderBy('id', 'asc')) 
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
        // const logs = await (Database
        //     .from('logs')
        //     .where('module_id', module.id).whereNotNull('value').orderBy('updated_at', 'desc')
        //     )
        // console.log("list", logs)

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
        const randValue = randomValue(+newModule.type);
        const newModuleId = await Database
        .table('modules')
        .insert({
            name: newModule.name,
            type: newModule.type,
            location: newModule.location,
            current_state: newModule.state?true:false,
            current_value: newModule.state?randValue:null,
            created_at: DateTime.now(),
            active: DateTime.now()
        }).returning("id")
        await Database
        .table('logs')
        .insert({
            module_id: newModuleId[0].id,
            state: newModule.state?true:false,
            value: newModule.state?randValue:null,
            updated_at: DateTime.now()
        })

        session.flash({success: "The module has been created"})
        response.redirect().toRoute('home')
    }

    changeState = async ({params, response}:HttpContextContract) => {
        let module = await Module.findOrFail(params.id)
        const randValue = randomValue(module.type);
        await Database
            .from('modules')
            .where('id', module.id)
            .update({
                current_state: !module.current_state,
                current_value: !module.current_state?randValue:null,
                active: !module.current_state?DateTime.now():undefined
            })
        await Database
            .table('logs')
            .insert({
                module_id: module.id,
                state: !module.current_state,
                value: !module.current_state?randValue:null,
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

function random(type:number) {
    let value = 0.0;
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
    return (Math.random() * (max - min + 1) + min).toFixed(1);
}

function getUptime(startDate: string) {
    const newDate = new Date(startDate)
    const uptime = newDate.getTime();
    return uptime;
}

function getUptimeList(startDateList: Module[]) {
    const uptimeList= [] as ModuleTimeInterface[];
    for (const k of startDateList) {
        uptimeList.push({
            id:k.id,
            current_state:k.current_state,
            active:k.active != null?msToTime(getUptime(k.active.toString())):'Not active'
        })
    }
    return uptimeList;
}

function randNb(min, max) {
    return (Math.random() * (max - min + 1) + min).toFixed(1);
}

async function randomValue(type:number) {
    let value = 0.0;
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

function msToTime(duration) {
    var seconds = Number(Math.round(duration/1000)%60)
        , minutes = Number(Math.round(duration/(1000*60))%60)
        , hours = Number(Math.round(duration/(1000*60*60))%24);
    
    let hour = (hours < 10) ? "0" + hours : hours;
    let minute = (minutes < 10) ? "0" + minutes : minutes;
    let second = (seconds < 10) ? "0" + seconds : seconds;
    
    return `${hour} heures ${minute} minutes ${second} secondes`;
}