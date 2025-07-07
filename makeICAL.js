import { ICAL } from "https://code4fukui.github.io/ICAL/ICAL.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";

const data = await CSV.fetchJSON("fes-fukui.csv");
const list = [];
for (const item of data) {
  const ll = Geo3x3.decode(item.geo3x3);
  //const pos = "https://maps.google.com/?ll=" + ll.lat + "," + ll.lng;
  const pos = `https://www.google.com/maps?ll=${ll.lat}%2C${ll.lng}`;
  list.push({
    DTSTART: item.start + " 00:00",
    DTEND: item.end + " 24:00",
    SUMMARY: item.title,
    LOCATION: pos,
    DESCRIPTION: item.url + "\n" + item.ogpdescription,
  });
}
console.log(list);
await Deno.writeTextFile("fes-fukui.ics", ICAL.stringify(list));
