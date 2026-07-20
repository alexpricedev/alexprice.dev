import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

// Article links should open in a new tab, keeping the reader on the site.
const marked = new Marked({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : "";
      return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
    },
  },
});

export type ArticlePillar =
  | "scaling"
  | "fundraising"
  | "ai"
  | "war-stories"
  | "startups"
  | "leadership";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  excerpt: string;
  pillar?: ArticlePillar;
  image?: string;
  readingTime: number;
};

export type Article = ArticleMeta & {
  content: string; // HTML content
};

type Frontmatter = {
  title: string;
  date: Date | string;
  excerpt: string;
  pillar?: ArticlePillar;
  image?: string;
};

const CONTENT_DIR = join(process.cwd(), "content", "writing");
const WORDS_PER_MINUTE = 200;

/**
 * Format a date as "15 Jan 2024"
 */
function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format a date as ISO 8601 string for SEO
 */
function formatIsoDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Calculate reading time based on word count (200 words per minute)
 */
function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

/**
 * Parse a markdown file and extract metadata and content
 */
function parseArticle(filePath: string, slug: string): Article {
  const fileContent = readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  const htmlContent = marked.parse(content) as string;
  const readingTime = calculateReadingTime(content);

  return {
    slug,
    title: frontmatter.title,
    date: formatDate(frontmatter.date),
    isoDate: formatIsoDate(frontmatter.date),
    excerpt: frontmatter.excerpt,
    pillar: frontmatter.pillar,
    image: frontmatter.image,
    readingTime,
    content: htmlContent,
  };
}

/**
 * Get metadata for all articles, sorted by date (newest first)
 * Returns empty array if directory doesn't exist
 */
export function getAllArticles(): ArticleMeta[] {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".md"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = join(CONTENT_DIR, file);
    const article = parseArticle(filePath, slug);

    // Return only metadata (exclude content)
    const { content: _, ...meta } = article;
    return meta;
  });

  // Sort by date (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.isoDate);
    const dateB = new Date(b.isoDate);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single article by its slug
 * Returns null if not found
 */
export function getArticleBySlug(slug: string): Article | null {
  const filePath = join(CONTENT_DIR, `${slug}.md`);

  if (!existsSync(filePath)) {
    return null;
  }

  return parseArticle(filePath, slug);
}
