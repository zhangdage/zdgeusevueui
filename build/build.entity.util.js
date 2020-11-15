const fs= require('fs') 
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const path = require('path')
const glob = require('glob') // 用于筛选文件


// 获取入口文件的模板
const getTemplate = pagePath => {
    return (
    `
  import App from '${pagePath}';
  import Vue from 'vue';
    new Vue({
    render: function (h) {
    return h(App);
  }
  }).$mount('#app');`);
  }

// 获取页面的目录
exports.getPages = function (folder){
  // ./src/modules/**/@(page.vue|main.js)
  folder = "./src/"+folder+"/**/index.vue"
  let fileArr = glob.sync(folder)
  for(let i in fileArr){
    fileArr[i] = fileArr[i].replace(/^\.\//,'')
  }
  return fileArr;
}

// 获取入口的目录
exports.getEntries = function(folder){
  // ./src/modules/**/@(page.vue|main.js)
  folder = "./src/"+folder+"/**/main.js"
  let fileArr = glob.sync(folder)
  for(let i in fileArr){
    fileArr[i] = fileArr[i].replace(/^\.\//,'')
  }
  return fileArr;
}

// 生成对应的每个页面的入口文件，并返回对应对的入口对象
exports.generateEntries = function(pageList,entryList,modules,creatEntityFolder,commonTemplate,clearDirFlag){
  // ["src/**/page.vue"]["src/**/main.js"]

  // 装给vue.config.js的参数
  let entries = {}
  // 装需要创建入口文件的数组
  let createEntries = {}


  // 扩展名
  let fileExtname = ''
  // 前缀路径
  let fileDirname = ''
  // 页面标识
  let pagePro = ''
  // 相对路径
  let relDir = ''

  // 先处理获取入口页面
  pageList.forEach(item=>{
    // 文件后缀名
    // fileExtname = path.extname(item);

    // 文件的前缀路径名，用于区分每个页面
    fileDirname = path.dirname(item).replace(/^src\//,'');
    // 页面的属性标识
    uniqueDir = fileDirname.replace(modules+'\/','');
    
    pagePro = uniqueDir.replace(/\//g,"_");

    entries[pagePro] = {
      entry: creatEntityFolder+'/'+uniqueDir+'/main.js',
      template: commonTemplate,
      title:pagePro,
      filename:fileDirname+'/index.html'
    }

    createEntries[pagePro] = {
      // 估计默认webpack设置了：项目目录为根目录
      pageEntry: item,
      createFile: './'+creatEntityFolder+'/'+uniqueDir+'/main.js'
    }
  })


  // 处理入口文件，并替换
  entryList.forEach(item=>{
    // 文件的前缀路径名，用于区分每个页面
    fileDirname = path.dirname(item).replace(/^src\//,'');
    // 页面的属性标识
    uniqueDir = fileDirname.replace(modules+'\/','');
    
    pagePro = uniqueDir.replace(/\//g,"_");

    console.log('已写的入口')
    console.log(item)
    if(entries.hasOwnProperty(pagePro)){
      entries[pagePro].entry = item;
      console.log('开始删除属性')
      delete createEntries[pagePro];
    }
  })

  // 是否先清除指定文件夹目录
  if(clearDirFlag){
    rimraf.sync(creatEntityFolder+'/*');
  }

  // 生成指定文件
  for(let pro in createEntries){
    const oneFileObj = createEntries[pro];
    // 图方便，使用了绝对路径取
    const template = getTemplate(path.resolve(oneFileObj.pageEntry).replace(/\\/g,'/'));

    console.log('需要生成的入口')
    console.log(path.resolve(oneFileObj.createFile))

    if (fs.existsSync(path.resolve(oneFileObj.createFile))){
      continue;
    }else{
      // 使用插件递归生成文件夹
      mkdirp.sync(path.resolve(path.dirname(oneFileObj.createFile)));
    }
  
    console.log('新生成的入口')
    console.log(path.resolve(oneFileObj.createFile));
    fs.writeFileSync(path.resolve(oneFileObj.createFile), template, 'utf-8');
  }

  return entries;
}

// 获取指令参数
exports.getParam = function(){

  let paramArr = process.argv

  console.log("获取的所有的参数")

  // npm run build  moudules  entityjs  true
  // [
  //   'D:\\myInstalls\\nodejs\\node.exe',
  //   'D:\\zhangdagelearn\\zdgVueViewUI\\zdgusevueui\\node_modules\\@vue\\cli-service\\bin\\vue-cli-service.js',      
  //   'build',
  //   'moudules',
  //   'entityjs',
  //   'true'
  // ]
  console.log(paramArr);

  let paramObj = {};
  paramObj.pageDir = null;
  paramObj.createEntityDir = null;
  paramObj.cleartDirFlag = null;
} 