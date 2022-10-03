

export function sortByCreator(array, client) {
    if (client) {
        return array.filter(e => e.id.length > 8);
    } else {
        return array.filter(e => e.id.length < 8);
    }
}

export function filterByTemper(array,tempersFilterArray){
        return array.filter(e=>{
            if(!e.temperaments || !e.temperaments.length)return false;
            const breedTempers = e.temperaments.replace(/\s+/g, '').split(',');
           
            const validate =  tempersFilterArray.reduce((acc,curr)=>{
                    if(breedTempers.includes(curr)){
                        if(acc)return true;
                        return false;
                    }else{
                        return false;
                    }
            },true)
            if(validate)return true;
            else return false;
        });
 
}


export function sortByHeaviness(array,max) {
    let breed = [...array];
    if(max){
       
        return breed.sort((a, b) => {
            const pesoA = parseInt(a.weight.split('-')[0]||7)||0;
            const pesoA2 = parseInt(a.weight.split('-')[1]||pesoA+10)||0;
            const pesoB = parseInt(b.weight.split('-')[0]||7)||0;
            const pesoB2 = parseInt(b.weight.split('-')[1]||pesoB+10)||0;
        
            const peso1 = pesoA + pesoA2 / 2;
            const peso2 = pesoB + pesoB2 / 2;
             
            return peso2-peso1;
    
        });
       
    }else{
        return breed.sort((a, b) => {
            const pesoA = parseInt(a.weight.split('-')[0]);
            const pesoB = parseInt(b.weight.split('-')[0]);
             
            return pesoA-pesoB;
    
        });

    }
   
}

export function sortAlphabetically(array,order) {
    let breed = [...array];
    if(order){
        return breed.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0;
        });
    }else{
        // return array.sort((a,b)=>{
        //     return a.name.toLowerCase()===b.name.toLowerCase()?0:a.name.toLowerCase() < b.name.toLowerCase()?-1:1;
        // });
        return  breed.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
    }
}