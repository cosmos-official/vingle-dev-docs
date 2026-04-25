// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/utils/generateSidebar';
import remarkMarkmap from 'remark-markmap';
import rehypeMermaid from 'rehype-mermaid';

const DOCUMENT_URL = 'https://docs.vingle.kr';
const DOCUMENT_TITLE = 'vingle-backend dev docs';
const TARGET_REPOSITORY = 'vingle-backend';

// https://astro.build/config
export default defineConfig({
	site: DOCUMENT_URL,
	markdown: {
		syntaxHighlight: {
			type: 'shiki',
			excludeLangs: ['mermaid', 'math'],
		},
		remarkPlugins: [
			[remarkMarkmap,
				{
					darkThemeSelector: () => document.documentElement.matches('.dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
				}]
		],
		rehypePlugins: [rehypeMermaid],
	},
	integrations: [
		starlight({
			title: DOCUMENT_TITLE,
			social: [
				{ icon: 'github', label: 'GitHub', href: `https://github.com/cosmos-official/${TARGET_REPOSITORY}` },
			],
			sidebar: [
				{
					label: "Home",
					link: "/",
				},
				...sidebar
			],
			components: {
				PageTitle: './src/layouts/PageTitleOverride.astro'
			},
			customCss: ['./src/styles/markmap.css', './src/styles/mermaid.css']
		}),
	],
});
