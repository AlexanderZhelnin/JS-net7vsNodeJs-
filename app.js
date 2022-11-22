import { build } from "./gr-kernel/kernel.mjs";
import { compareStrings } from "./strings.mjs";
import * as fs from "fs";
import * as http from "http";

const hostname = "127.0.0.1";
const port = 3000;

const json = JSON.parse(fs.readFileSync("primitives.json", "utf8"));
const ls = json.sort((l1, l2) => {
  if (l1.priority < l2.priority) return -1;
  if (l1.priority > l2.priority) return 1;
  return 0;
});

const server = http.createServer((req, res) => {
  
  if (req.url == "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World nodeJs!");
  }
  
  if (req.url == "/readfile") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    const data = fs.readFileSync("data.txt", "utf8");
    res.end(data);
  }

  if (req.url == "/fibonacci") {
    let a = 0;
    let b = 1;
    let c = 0;
    for (let i = 2; i < 2000000; i++) {
      c = a + b;
      a = b;
      b = c;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(a.toString());
  }

  const rect = { left: 1200, bottom: 50, right: 4000, top: 2850 };
  const pr = { left: rect.left, top: rect.top, scale: 0.37037037037037035, mashtab: 100 };
  if (req.url == "/map") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
      
    res.end(JSON.stringify(build(ls, pr, rect)));
  }

  const STR1 = 'asrgfsadf12421';
  const STR2 = 'asrgfsadf12321';

  if (req.url == "/naturalsort") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    let result = 0;
    for (let i = 0; i < 10000; i++) 
      result += compareStrings(STR1 + i, STR2 + i);

    res.end(result.toString());
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
