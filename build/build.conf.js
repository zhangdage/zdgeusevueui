let {getPages,getEntries,generateEntries,getParam} = require('./build.entity.util.js')




exports.getEntries = function(){

    let pageDir = "modules";
    let createEntityDir = "entityjs";

    let template = "public/index.html";
    let cleartDirFlag = true;

    let paramObj = getParam();

    console.log(paramObj);


    let entity = generateEntries(getPages("modules"),getEntries("modules"),'modules','entityjs','public/index.html',true);

    console.log(entity);
    return entity;
}

// 检查是否变量为空
let isBlank = function(v){
    if(v === null ||v === undefined || v === NaN){
        return true
    }
    return false;
}