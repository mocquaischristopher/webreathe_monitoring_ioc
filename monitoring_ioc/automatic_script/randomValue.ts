import randNb from './randNb';

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
export default randomValue;


