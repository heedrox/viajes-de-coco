require("@babel/register")({
  presets: ["@babel/preset-env"]
});

global.chai = require('chai');
global.sinon = require('sinon');


global.chai.should();

global.expect = global.chai.expect;


