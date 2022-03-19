import Database from '@ioc:Adonis/Lucid/Database';
import Module from 'App/Models/Module'
import Detail from 'App/Models/Detail';

var chartLine = new Chart(
    document.getElementById("chartLine"),
    configLineChart
  );

function random(type) {
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

const getRandomValue = ( min:number, max:number ) => {
    return Math.floor( Math.random() * ( max - min ) ) + min;
}

async function toggleRandomModuleState ( allModules: Module[])  {
    const moduleID = getRandomValue( 1, allModules.length );
    const module = await findModule( moduleID );
    if ( module === null ) {
        return false;
    }
    const moduleStateIsToggle = await toggleModuleState( moduleID );
    if ( moduleStateIsToggle ) {
        return true;
    }
    return false;
} 

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

