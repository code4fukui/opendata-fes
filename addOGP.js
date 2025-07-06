import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchOGP } from "./fetchOGP.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const data = await CSV.fetchJSON("fes-fukui_src.csv");
for (const item of data) {
  item.start = new Day(item.start).toString();
  item.end = new Day(item.end).toString();
  console.log(item)

  if (item.ogpimage) continue;
  const ogp = await fetchOGP(item.url);
  console.log(item, ogp);
  item.ogpimage = ogp.image;
  item.ogpdescription = ogp.description;
}

await Deno.writeTextFile("fes-fukui.csv", CSV.stringify(data));

