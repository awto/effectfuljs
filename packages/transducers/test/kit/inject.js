var path = require("path");
require("@babel/register")({ ignore: ["@effectful/**/*"] });
global.expect = require("chai").expect;
