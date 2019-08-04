export * from "../api";
import { silent } from "../standalone";
silent();

(<any>global).deb = require("../main");
