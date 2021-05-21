import { useEffect, useRef } from 'react'
import { highlightBlock } from 'highlight.js'

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

export async function getStaticProps({ params }) {
    const showdown = require('showdown');
    showdown.setFlavor('github');

    const converter = new showdown.Converter({});

    const filePath = path.join(markdownFolderPath, params.slug + '.md');
    
    const md = fs.readFileSync(filePath, fsOptions);

    const __html = converter.makeHtml(md);
    const titles = fs.readdirSync(markdownFolderPath, fsOptions).map(title => title.slice(0, -3));

    return {
        props: { __html, titles }
    };
};

export async function getStaticPaths() {
    const filenames = fs.readdirSync(markdownFolderPath, fsOptions);

    return { 
        paths: filenames.map(name => `/posts/${name.slice(0,-3)}`),
        fallback: false
    };
};