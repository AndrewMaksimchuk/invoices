import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
// @deno-types="https://cdn.sheetjs.com/xlsx-0.18.7/package/types/index.d.ts"
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.7/package/xlsx.mjs";

const PORT = 8000;

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
