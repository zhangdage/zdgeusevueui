// import getPages from './build/buildEntityUtil.js'
// let pageList = getPages("modules");

let glob = require('glob') // 用于筛选文件

// let folder = 'modules';
// folder = "./src/"+folder+"/**/index.vue"

// console.log(folder)
// let pageList = glob.sync(folder);
// zdgusevueui/src/modules/moduleOne/pages/pageOne/index.vue
//D:/zhangdagelearn/zdgVueViewUI/zdgusevueui/src/modules/moduleOne/pages/pageOne/main.js

let one = glob.sync('D:/zhangdagelearn/zdgVueViewUI/zdgusevueui/src/modules/**/index.vue')
let pageList = glob.sync('D:/zhangdagelearn/zdgVueViewUI/zdgusevueui/src/modules/**/index.vue').forEach(item=>{ item.replace(/^D:/,'')});

one.forEach(item=>{ item = item.replace(/^D:/,'');console.log(item)});


console.log(pageList)
console.log(one)