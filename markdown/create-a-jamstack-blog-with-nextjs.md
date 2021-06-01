# Create a Jamstack Blog With Next.js

Author: [Hayden Linder](https://github.com/haydenlinder)

5/15/2021

<br/>

<hr/>

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

Next.js has a couple features I leveraged here - [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) and [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes).

To set up Dynamic Routes, I first create a folder called **/pages/** and add a file called **[slug].jsx**.

```jsx
// /pages/[slug].jsx

export default function Post() {
    return (
        <div />
    );
};
```

Next, I export a function called [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation), which will determine the **slug** for each page. 

Here I simply take the name of each file in the **/markdown/** folder and slice off the **.md** extension.

With that list, I also generate a manifest.js file which can be used by a menu component to display a list of posts.

```jsx
// /pages/[slug.jsx]

export default function Post() {
    return (
        <div />
    );
};

const fs = require('fs');
const path = require('path');
const fsOptions = { encoding: 'utf8' };

const markdownFolderPath = path.join(process.cwd(), `markdown`);
const manifestFolderPath = path.join(process.cwd(), `manifest/manifest.js`);

export async function getStaticPaths() {
    const filenames = fs.readdirSync(markdownFolderPath, fsOptions);
    const slugs = filenames.map(name => `/posts/${name.slice(0,-3)}`);

    const manifest = `export const manifest = ${JSON.stringify(slugs)}`;
    // Note that /manifest/manifest.js must already exist for this to work.
    fs.writeFileSync(manifestFolderPath, manifest);

    return { 
        // The `paths` returned here will determine the url of each 
        // post. For example, `/posts/my-blog-post`.
        paths: slugs.map(slug => `/posts/${slug}`,
        fallback: false
    };
};
```

Next, I implement Static Generation by exporting a function called [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation), which will convert the text from files in **/markdown/** to HTML and then pass that HTML to the component as props to be used as [dangerourlySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml). 

```jsx
// /pages/[slug.jsx]

export default function Post({ __html }) {
    return (
        <div dangerouslySetInnerHTML={{ __html }}/>
    );
};

const fs = require('fs');
const path = require('path');
const fsOptions = { encoding: 'utf8' };

const markdownFolderPath = path.join(process.cwd(), `markdown`);
const manifestFolderPath = path.join(process.cwd(), `manifest/manifest.js`);

// Extract `params` from `context` parameter, 
// which contains the slug from `getStaticPaths`.
export async function getStaticProps({ params }) {
    // Set up showdown.
    const showdown = require('showdown');
    showdown.setFlavor('github');
    const converter = new showdown.Converter({});
    // params.slug is a slug generated from `getStaticPaths`.
    const filePath = path.join(markdownFolderPath, params.slug + '.md');
    
    const md = fs.readFileSync(filePath, fsOptions);
    const __html = converter.makeHtml(md);
    
    return {
        // These are the props that the component will receive at build time.
        props: { __html }
    };
};

export async function getStaticPaths() {
    const filenames = fs.readdirSync(markdownFolderPath, fsOptions);
    const titles = filenames.map(name => `/posts/${name.slice(0,-3)}`);

    const manifest = `export const manifest = ${JSON.stringify(titles)}`;
    // Note that /manifest/manifest.js must already exist for this to work.
    fs.writeFileSync(manifestFolderPath, manifest);

    return { 
        // The `paths` returned here will determine the url of each 
        // post. For example, `/posts/my-blog-post`.
        paths: titles,
        fallback: false
    };
};
```

Finally, I add a bit of logic in **useEffect** to add syntax highlighting to the code blocks.

```jsx
// /pages/[slug.jsx]

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
        <div ref={ref} dangerouslySetInnerHTML={{ __html }}/>
    );
};

const fs = require('fs');
const path = require('path');
const fsOptions = { encoding: 'utf8' };

const markdownFolderPath = path.join(process.cwd(), `markdown`);
const manifestFolderPath = path.join(process.cwd(), `manifest/manifest.js`);

// Extract `params` from `context` parameter, 
// which contains the slug from `getStaticPaths`.
export async function getStaticProps({ params }) {
    // Set up showdown.
    const showdown = require('showdown');
    showdown.setFlavor('github');
    const converter = new showdown.Converter({});
    // params.slug is a slug generated from `getStaticPaths`.
    const filePath = path.join(markdownFolderPath, params.slug + '.md');
    
    const md = fs.readFileSync(filePath, fsOptions);
    const __html = converter.makeHtml(md);
    
    return {
        // These are the props that the component will receive at build time.
        props: { __html }
    };
};

export async function getStaticPaths() {
    const filenames = fs.readdirSync(markdownFolderPath, fsOptions);
    const titles = filenames.map(name => `/posts/${name.slice(0,-3)}`);

    const manifest = `export const manifest = ${JSON.stringify(titles)}`;
    // Note that /manifest/manifest.js must already exist for this to work.
    fs.writeFileSync(manifestFolderPath, manifest);

    return { 
        // The `paths` returned here will determine the url of each 
        // post. For example, `/posts/my-blog-post`.
        paths: titles,
        fallback: false
    };
};
```

Check out [the source](https://github.com/haydenlinder/blog/blob/main/pages/posts/%5Bslug%5D.jsx).