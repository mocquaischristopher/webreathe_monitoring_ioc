/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', 'MonitoringController.dashboard').as('home')
Route.get('/modules/:id','MonitoringController.oneModule').as('modules.show')
Route.get('/module-form', 'MonitoringController.createModuleForm').as('modules.create')
Route.post('/form-create','MonitoringController.createModule')
Route.post('/modules/:id/changeState', 'MonitoringController.changeState')
Route.post('/modules/:id/deleteModule', 'MonitoringController.deleteModule')
