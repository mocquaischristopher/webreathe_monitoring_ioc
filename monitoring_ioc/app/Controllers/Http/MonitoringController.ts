import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MonitoringController {

    getDashboard = async ({ view }: HttpContextContract) => {
        return view.render('home')
    }

    getOneModule= async ({view}:HttpContextContract)=>{
        // let customer= await this.bankRootService.getOneCustomerById(Number(request.params().id))
        
        
        return view.render('modules')
    }

    getCreateModuleForm=async({view}:HttpContextContract)=>{
        // let genderArray = await this.bankRootService.getAllGender()
        return view.render('createModuleForm')
    }

    createModule=async({request,response}:HttpContextContract)=>{
        // let newModule=request.body() as createModuleDto
        // await this.bankRootService.createCustomer(newCustomer)
       
       response.redirect('/')
    }


}
