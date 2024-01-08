import { remark } from "remark";
import html from "remark-html";

export const markdownToHtml = async (markdown: string) =>
  remark()
    .use(html)
    .process(markdown)
    .then((r) => r.toString());
