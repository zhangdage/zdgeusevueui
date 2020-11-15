let {getEntries} = require('./build/build.conf.js')


let entity = getEntries();


module.exports = {
    // pages: {
    //     moduleOne: {
    //       entry: 'src/modules/moduleOne/pages/pageOne/main.js',
    //       template: 'public/index.html',
    //       filename: 'modules/moduleOne/pages/pageOne.html',
    //       title: '张大哥的第一个页面',
    //     },
    //     moduleTwo: {
    //       entry: 'src/modules/moduleOne/pages/pageTwo/main.js',
    //       template: 'public/index.html',
    //       filename: 'modules/moduleOne/pages/pageTwo.html',
    //       title: '张大哥的第二个页面',
    //     },
    // }
    pages:entity
}