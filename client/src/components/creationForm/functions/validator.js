/* eslint-disable no-useless-escape */
import axios from "axios";



let faltaAlgo = 0;
let loQueFalta = "";
let error = 0;
export default function formValidator(name, minHeight, maxHeight, minWeight, maxWeight, image, tempers, breeds) {
    const values = { name, minHeight, maxHeight, minWeight, maxWeight, image };
    const params = ['name', 'minHeight', 'maxHeight', 'minWeight', 'maxWeight', 'image'];
    faltaAlgo = 0;
    loQueFalta = '';
    error = 0;

    
    if (breeds.find(e => e.name === name)) {
        error = 'ya existe'
    }
    // const validImage = image.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
    params.forEach(param => {
        if (!values[param]) {
            faltaAlgo++;
            loQueFalta += ` ${param}`
        }
    });
    
    if (faltaAlgo !== 0) {
        if (faltaAlgo === 1) {
            error = `Required ${loQueFalta} field`;
        }
        error = 'All fields completed requiered'
        
    } else if (Number.isNaN(parseInt(minHeight))||Number.isNaN(parseInt(maxHeight))
    || Number.isNaN(parseInt(minWeight))|| Number.isNaN(parseInt(maxWeight))) {
        
        error = 'Required Height and Weight fields to be filled with integer number values';
        
    // } else if (!validImage) {
    //     error = 'Invalid image url'
    } else if (breeds.find(e => e.name === name)) {
        error = 'Breed Already Existent'
    }else if(parseInt(minWeight)>parseInt(maxWeight)){
        error = 'required min height to be lower than max height'
    };
    
    if (error) { 
        return error;
    }
    const height = `${minHeight} - ${maxHeight}`;
    const weight = `${minWeight} - ${maxWeight}`;

    
    
    (async function fetchFunction() {
        try {
            await axios.post('http://localhost:3001/breed', {
                name,
                height,
                weight,
                image,
                tempers
            });
            

        } catch (err) {
            error = err.message
        }

    })(error);
    
    
    if(error){return error}
   
   

    // if(typeof fetchFunction() === 'object');

    //     axios.post('http://localhost:3001/breed', {
    //         name,
    //         height,
    //         weight,
    //         image,
    //         tempers
    //     }).catch(err => {
    //         return 'holaaaa';

    //     });
}