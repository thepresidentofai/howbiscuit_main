import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://howbiscuit.com',
  integrations: [
    starlight({
      title: 'How Biscuit',
      description: 'Plain-language explainers from the Biscuit Field Guide.',
      customCss: ['./src/styles/biscuit-field-guide.css'],
      editLink: {
        baseUrl: 'https://github.com/thepresidentofai/howbiscuit_main/edit/main/',
      },
      sidebar: [
        {
          label: 'Biscuit Field Guide',
          items: [
            { label: 'Start Here', slug: '' },
            { label: 'Math', slug: 'math' },
            { label: 'Research & Writing', slug: 'research-writing' },
            { label: 'Cooking', slug: 'cooking' },
            { label: 'Home Tech', slug: 'home-tech' },
            { label: 'Make-Do Lab', slug: 'make-do-lab' },
            { label: 'Tools', slug: 'tools' },
          ],
        },
        {
          label: 'Articles',
          items: [
            {
              label: 'How Does Baking Powder Work?',
              slug: 'articles/how-does-baking-powder-work',
            },
            {
              label: 'Why Are Some Answers Better Than Others?',
              slug: 'articles/why-are-some-answers-better-than-others',
            },
          ],
        },
        {
          label: 'Trust',
          items: [
            { label: 'About', slug: 'about' },
            { label: 'Editorial Policy', slug: 'editorial-policy' },
            { label: 'Corrections', slug: 'corrections' },
            { label: 'Privacy', slug: 'privacy' },
            { label: 'Affiliate Disclosure', slug: 'affiliate-disclosure' },
            { label: 'Contact', slug: 'contact' },
          ],
        },
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'sitemap',
            href: '/sitemap.xml',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: 'How Biscuit RSS Feed',
            href: '/feed.xml',
          },
        },
      ],
    }),
  ],
});
