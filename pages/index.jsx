import { useEffect, useRef } from 'react'
import { highlightBlock } from 'highlight.js'
import Link from 'next/link'

export default function Index({ titles }) {
    const ref = useRef();

    useEffect(() => {
        const codeBlocks = ref.current.querySelectorAll('code')
        for(let i = 0; i < codeBlocks.length; i++) {
            highlightBlock(codeBlocks[i])
        }
    }, []);
    
    return (
        <div ref={ref}>
            <h1 id="welcome-to-blogmd">Welcome To BLOG-MD!</h1>
            <p>Where blog posts are written in markdown.</p>
            <p>If you'd like to add something, please see <Link href='/posts/contributing' passHref><a>contributing</a></Link>.</p>
            <p><br/></p>
            <hr />
            <p><br/></p>
            <h1 id="posts">Posts</h1>
            <div>
                {titles.map(title => 
                    <h2 key={title}>
                        <Link href={'/posts/' + title} passHref>
                            <a>{title}</a>
                        </Link>
                    </h2>
                )}
            </div>
        </div>
    );
};


export async function getStaticProps() {
    const fs = require('fs');
    const path = require('path');
    const fsOptions = { encoding: 'utf8' };
    
    const markdownFolderPath = path.join(process.cwd(), `markdown`);

    const titles = fs.readdirSync(markdownFolderPath, fsOptions).map(title => title.slice(0,-3));

    return {
        props: { titles }
    };
};
