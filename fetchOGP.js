import { fetchOrLoad, HTMLParser } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

export const getMeta = (dom, prop) => {
  const metas = dom.querySelectorAll("meta");
  const m = metas.find(i => i.getAttribute("property") == prop);
  if (!m) return null;
  return m.getAttribute("content");
};

export const fetchOGP = async (url) => {
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);
  const o = {};
  const metas = dom.querySelectorAll("meta");
  console.log(metas);
  o.url = getMeta(dom, "og:url");
  o.title = getMeta(dom, "og:title");
  o.name = o.title.substring(0, o.title.indexOf(" - "));
  o.modified = getMeta(dom, "article:modified_time");
  o.image = getMeta(dom, "og:image");
  o.description = getMeta(dom, "og:description");
  return o;
};
