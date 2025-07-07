import { CSV } from "https://js.sabae.cc/CSV.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";

const title = "福井県フェスオープンデータ";

const data = await CSV.fetchJSON("fes-fukui.csv");
const html = [];
html.push(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:">`);
html.push(`<link rel="stylesheet" href="fes-fukui.css">`);
html.push(`<title>${title}</title></head><body>`);
html.push(`<h1>${title}</h1>`);

html.push(`<div class=fes-list>`);

for (const item of data) {
  const ll = Geo3x3.decode(item.geo3x3);
  //const pos = "https://maps.google.com/?ll=" + ll.lat + "," + ll.lng;
  const pos = `https://www.google.com/maps?ll=${ll.lat}%2C${ll.lng}`;
  html.push(`
    <div class=fes>
      <a href=${item.url}>
        <img src=${item.ogpimage}>
        <h2>${item.title} - ${item.city}</h2>
      </a>
      <div class=description>${item.ogpdescription}</div>
    </div>
  `);
}
html.push(`</div>`);
html.push(`<hr><a href=https://github.com/code4fukui/opendata-fes/>src on GitHub</a><br>`);
html.push("</body></html>");
await Deno.writeTextFile("fes-fukui.html", html.join("\n") + "\n");
