import { useEffect, useRef } from 'react';
import { highlightBlock } from 'highlight.js';

export default function Post({ __html }) {

    const ref = useRef();

    useEffect(() => {
        const codeBlocks = ref.current.querySelectorAll('code');
        
        for (let i = 0; i < codeBlocks.length; i++) {
            highlightBlock(codeBlocks[i]);
        }
    }, [__html]);

    return (
        <div ref={ref} dangerouslySetInnerHTML={{ __html }} />
    );

};

const fs = require('fs');
const path = require('path');
const fsOptions = { encoding: 'utf8' };

const markdownFolderPath = path.join(process.cwd(), `markdown`);
const manifestFolderPath = path.join(process.cwd(), `manifest/manifest.js`);
const sitemapFilePath = path.join(process.cwd(), `public/sitemap.txt`);

export async function getStaticPaths() {
    const filenames = fs.readdirSync(markdownFolderPath, fsOptions);
    const slugs = filenames.map(name => name.slice(0, -3));

    const manifest = `export const manifest = ${JSON.stringify(slugs)}`;
    const sitemap = slugs.map(slug => `https://www.blog-md.com/posts/${slug}\n`)
    fs.writeFileSync(manifestFolderPath, manifest);
    fs.writeFileSync(sitemapFilePath, sitemap.join(''));

    return {
        paths: slugs.map(slug => `/posts/${slug}`),
        fallback: false
    };
};

export async function getStaticProps({ params }) {
    const showdown = require('showdown');
    showdown.setFlavor('github');

    const converter = new showdown.Converter({});
    const filePath = path.join(markdownFolderPath, params.slug + '.md');
    
    const md = fs.readFileSync(filePath, fsOptions);

    const __html = converter.makeHtml(md);
    
    return {
        props: { __html }
    };
};
