let covid = require('novelcovid');
let nodefetch = require('node-fetch');
const _ = require('lodash');

((async (test) => {
     /**
      * @var state {Response}
      */
     const datar = await covid.jhucsse({country: "Spain"});

     console.log(datar);

})()).catch(console.error).finally(console.log);

