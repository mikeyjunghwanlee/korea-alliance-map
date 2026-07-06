const fs = require("fs");
const path = __dirname;
const data = fs.readFileSync(path + "/data.json", "utf8");
JSON.parse(data); // validate before injecting
const tpl = fs.readFileSync(path + "/template.html", "utf8");
if (!tpl.includes("/*__DATA__*/")) throw new Error("template.html is missing the /*__DATA__*/ placeholder");
fs.writeFileSync(path + "/index.html", tpl.replace("/*__DATA__*/;", data.trim() + ";"));
console.log("built index.html (" + JSON.parse(data).nodes.length + " nodes, " + JSON.parse(data).edges.length + " edges, updated " + JSON.parse(data).lastUpdated + ")");
