import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const docsRoot = path.join(root, 'src', 'content', 'docs');

const requiredDocs = [
  'index.mdx',
  'math/index.mdx',
  'research-writing/index.mdx',
  'cooking/index.mdx',
  'home-tech/index.mdx',
  'make-do-lab/index.mdx',
  'tools/index.mdx',
  'about/index.mdx',
  'editorial-policy/index.mdx',
  'corrections/index.mdx',
  'privacy/index.mdx',
  'affiliate-disclosure/index.mdx',
  'contact/index.mdx',
  'articles/how-does-baking-powder-work/index.mdx',
  'articles/why-are-some-answers-better-than-others/index.mdx',
];

const requiredComponents = [
  'ShortAnswer.astro',
  'CommonMistakes.astro',
  'CheapSafeGuide.astro',
  'EvidenceBadge.astro',
  'RiskBadge.astro',
];

const forbiddenPublicRoutes = [
  'index.html',
  '404.html',
  'feed.xml',
  'robots.txt',
  'sitemap.xml',
  'assets/styles.css',
  'articles/how-does-baking-powder-work/index.html',
  'articles/why-are-some-answers-better-than-others/index.html',
];

const requiredEndpoints = ['feed.xml.js', 'robots.txt.js', 'sitemap.xml.js'];
const placeholderPattern = /\b(lorem|todo|tbd|placeholder)\b/i;
const errors = [];

function requireFile(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!existsSync(fullPath)) {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

function rejectFile(relativePath) {
  const fullPath = path.join(root, 'public', relativePath);
  if (existsSync(fullPath)) {
    errors.push(`Static public route conflicts with Astro output: public/${relativePath}`);
  }
}

function frontmatterFor(source, relativePath) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    errors.push(`Missing frontmatter: ${relativePath}`);
    return '';
  }
  return match[1];
}

async function collectMdxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectMdxFiles(fullPath)));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

for (const doc of requiredDocs) {
  requireFile(path.join('src', 'content', 'docs', doc));
}

for (const component of requiredComponents) {
  requireFile(path.join('src', 'components', component));
}

for (const endpoint of requiredEndpoints) {
  requireFile(path.join('src', 'pages', endpoint));
}

for (const publicRoute of forbiddenPublicRoutes) {
  rejectFile(publicRoute);
}

const mdxFiles = existsSync(docsRoot) ? await collectMdxFiles(docsRoot) : [];
for (const file of mdxFiles) {
  const relativePath = path.relative(root, file).replaceAll(path.sep, '/');
  const source = await readFile(file, 'utf8');
  const frontmatter = frontmatterFor(source, relativePath);
  if (!/title:\s*\S/.test(frontmatter)) {
    errors.push(`Missing title in frontmatter: ${relativePath}`);
  }
  if (!/description:\s*\S/.test(frontmatter)) {
    errors.push(`Missing description in frontmatter: ${relativePath}`);
  }
  if (placeholderPattern.test(source)) {
    errors.push(`Placeholder language found in public content: ${relativePath}`);
  }
}

const feedArticlePaths = [
  path.join(docsRoot, 'articles', 'how-does-baking-powder-work', 'index.mdx'),
  path.join(docsRoot, 'articles', 'why-are-some-answers-better-than-others', 'index.mdx'),
];

for (const articlePath of feedArticlePaths) {
  const source = await readFile(articlePath, 'utf8');
  const frontmatter = frontmatterFor(source, path.relative(root, articlePath));
  if (!/feed:\s*true/.test(frontmatter)) {
    errors.push(`Article is not in RSS feed: ${path.relative(root, articlePath)}`);
  }
  if (!/pubDate:\s*2026-07-01/.test(frontmatter)) {
    errors.push(`Article publication date changed unexpectedly: ${path.relative(root, articlePath)}`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Content lint passed for ${mdxFiles.length} MDX pages.`);
