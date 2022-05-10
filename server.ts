import { Application, Router } from "https://deno.land/x/oak/mod.ts";
// @deno-types="https://cdn.sheetjs.com/xlsx-0.18.7/package/types/index.d.ts"
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.7/package/xlsx.mjs";
/* load the codepage support library for extended support with older formats  */
import * as cptable from "https://cdn.sheetjs.com/xlsx-0.18.7/package/dist/cpexcel.full.mjs";
XLSX.set_cptable(cptable);

const excelExtension = ".xlsx";
const file = {
  name: "",
};

for await (const dirEntry of Deno.readDir(Deno.cwd())) {
  dirEntry.isFile && dirEntry.name.includes(excelExtension) &&
    (file.name = dirEntry.name);
}

const workbook = XLSX.readFile(file.name);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const ws = XLSX.utils.sheet_to_json(worksheet, { header: "A" });

// console.log(ws)

Deno.run({
  cmd: ["firefox", "localhost:8000"],
});

const router = new Router();
router
  .get("/data", (context) => context.response.body = ws)
  .get("/close", () => {
    Deno.exit(0);
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}`,
      index: "index.html",
    });
  } catch {
    next();
  }
});

await app.listen({ port: 8000 });

// XLSX.writeFile(workbook, "test.xlsx");
// XLSX.writeFileXLSX(workbook, filename, opts);
