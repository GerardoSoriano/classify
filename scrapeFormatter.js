// const fs = require('fs');

// const input =  process.argv;

// if(input[2] === undefined){
//     console.error("No file name inputted, please add the name of the json to the args");
//     process.exit();
// }
// var filePath = './'+input[2];
// const jsonData = fs.readFileSync(filePath,'utf-8');

// const data = JSON.parse(jsonData);
// const reformatted = scrapeFormatter(data);

// var newData = JSON.stringify(reformatted);
// fs.writeFile(filePath.substring(0,filePath.length-5)+"_formatted.json", newData, (err) => { 
//     if (err) 
//     console.log(err); 
// });

function scrapeFormatter(data){

    for(const dept in data){
        for(const index in data[dept]){
            for(const key in data[dept][index]){
                if(key === "course name"){
                    const temp = data[dept][index][key].split(' -');
                    const split = temp[2].trim().split(" ");
                    delete data[dept][index][key];
                    data[dept][index].crn = temp[1].trim();
                    data[dept][index].title = temp[0].trim();
                    data[dept][index].dcode = split[0].trim();
                    data[dept][index].cno = split[1];
                    data[dept][index].section = temp[3].trim();
                }
                else if(key === "instructor"){
                    if(data[dept][index][key][0] != undefined){
                    const temp = data[dept][index][key][0].split(',')[0];
                    if(temp != undefined && temp.substring(temp.length-3,temp.length) === '(P)'){
                        data[dept][index]["instructor"] = temp.substring(0,temp.length-3).trim();
                    }
                    else if( temp === "TBA"){
                        data[dept][index]["instructor"] = "TBA";
                    }
                }
                }
                else{
                    const replace = data[dept][index][key][0];

                    delete data[dept][index][key];
                    data[dept][index][key] = replace;
                }
            }
        }
    }
    for(const dept in data){
        for(const index in data[dept]){
            for(const key in data[dept][index]){
            if(key != "crn"){
                const replace = data[dept][index][key];

                delete data[dept][index][key];
                data[dept][index][key] = replace;
            }
            }
        }
    }
    return data;
}

module.exports = scrapeFormatter;