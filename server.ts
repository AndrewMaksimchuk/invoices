import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
// @deno-types="https://cdn.sheetjs.com/xlsx-0.18.7/package/types/index.d.ts"
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.7/package/xlsx.mjs";
/* load the codepage support library for extended support with older formats  */
// import * as cptable from "https://cdn.sheetjs.com/xlsx-0.18.7/package/dist/cpexcel.full.mjs";
// XLSX.set_cptable(cptable);


const excelExtension = ".xlsx";
const file = {
  name: "",
  data: [],
};


for await (const dirEntry of Deno.readDir(Deno.cwd())) {
  dirEntry.isFile &&
    dirEntry.name.includes(excelExtension) &&
    (file.name = dirEntry.name);
}


if (file.name) {
  const workbook = XLSX.readFile(file.name);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  file.data = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
}


// open http://localhost:8000 - linux os
// start http://localhost:8000 - windows os
const PORT = 8000;
const URL = "http://localhost:" + PORT;
const cmd = Deno.build.os === "windows" ? ["start", URL] : ["open", URL];
Deno.run({ cmd });


const router = new Router();
router
  .get("/data", (context) => (context.response.body = file.data))
  .get("/close", () => {
    Deno.exit(0);
  });


const app = new Application();
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/ui/dist`,
      index: "index.html",
    });
  } catch {
    next();
  }
});
app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: PORT });


// XLSX.writeFile(workbook, "test.xlsx");
// XLSX.writeFileXLSX(workbook, filename, opts);
