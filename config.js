const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "fawGWQjK#1wpeJzlmFqcaFSsTJg3xq5rCuSNmu31Z3oSfoMAZBck",
  MONGODB: process.env.MONGODB || "mongodb://mongo:FgDzFEHtnfVtptNXifWYtYTMbPnAJGKK@mainline.proxy.rlwy.net:47582",
  OWNER_NUM: process.env.OWNER_NUM || "94766863255",
  API_KEY:process.env.API_KEY || "sky|e6ad5555ee53b73644770beab633855c2f646a77",
  
};
