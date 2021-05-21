# How to Create A Blog with Markdown

Author: [Hayden Linder](https://github.com/haydenlinder)

5/15/2021

<br/>

---

<br/>

## Motivation

I've been meaning to start a blog for a while now and while I was looking around for options, I didn't see anything that met my needs, so I decided to roll my own.


## Requirements

I wanted to be able to write blog posts in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and then have the file converted to HTML. This would help the site maintain consistent styling, make it easy for people who don't necessarily know much HTML to contribute, and allow me to leverage GitHub as a stand-in for user authentication. I also wanted to make sure that my site had great SEO, so that people could easily find the articles online. Finally, I needed syntax highlighting for code blocks. 

## Stack

After doing more research, here's the stack I settled on:

| **Tech**      | **Purpose**   | 
| ------------- | ------------- | 
| [Next.js](https://nextjs.org/)       | React + SEO           | 
| [Showdown.js](http://showdownjs.com/)      | Markdown -> HTML      | 
| [Highlight.js](https://highlightjs.org/) | Syntax highlighting for code blocks     | 
| [Material-UI](https://material-ui.com/) | Plug-and-play buttons, menus, media queries for React, etc  | 

## Implementation

Here's the script that does the conversion from **.md -> .jsx**.

```js
// /pages/[slug].jsx
import { useEffect, useRef } from 'react'
import { highlightBlock } from 'highlight.js'

export default function Post({ __html }) {

    const ref = useRef();

    useEffect(() => {
        const codeBlocks = ref.current.querySelectorAll('code');
        
        for (let i = 0; i < codeBlocks.length; i++) {
            highlightBlock(codeBlocks[i]);
        }
    }, []);

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

    return {
        props: { __html }
    };
};

export async function getStaticPaths() {
    const filenames = fs.readdirSync(markdownFolderPath, fsOptions);
    console.log('converting ', filenames);

    return { 
        paths: filenames.map(name => `/posts/${name.slice(0,-3)}`),
        fallback: false
    };
};
```