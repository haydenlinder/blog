
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        import Link from 'next/link'
        
        export default function ontributing() {
            const ref = useRef()
            useEffect(() => {
                const codeBlocks = ref.current.querySelectorAll('code')
                for(let i = 0; i < codeBlocks.length; i++) {
                    highlightBlock(codeBlocks[i])
                }
            }, [])
            
            return (
                <div ref={ref}><h1 id="contributing">Contributing</h1>
<p>Contributing is fun and easy. Please consider taking a look at the <a href="https://github.com/haydenlinder/blog/issues">open issues</a> for this project, which may serve as a good source for blog-worthy challenges.</p>
<h2 id="1-fork">1. Fork</h2>
<p>Go to <a href="https://github.com/haydenlinder/blog">the repo</a> for this project and fork it.</p>
<p>Clone your fork locally:</p>
<pre><code className="bash language-bash">{`git clone https://github.com/yourname/blog.git`}</code></pre>
<p>Set the remote "upstream" to the original repo.</p>
<pre><code className="bash language-bash">{`git remote add upstream https://github.com/haydenlinder/blog.git`}</code></pre>
<h2 id="2-run-locally">2. Run Locally</h2>
<p>First, run the development server:</p>
<pre><code className="bash language-bash">{`cd blog
npm install
npm run dev`}</code></pre>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</p>
<h2 id="3-write">3. Write</h2>
<p>Create a new markdown (.md) file in the <strong>/markdown/</strong> folder. Use dash-deliniated file names, for example: <strong>New-Blog-Post.md</strong>.</p>
<p>Write some <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a>.</p>
<p>Run </p>
<pre><code className="bash language-bash">{`npm run parse`}</code></pre>
<p>Visit <a href="http://localhost:3000/New-Blog-Post">http://localhost:3000/New-Blog-Post</a>, but replace <em>New-Blog-Post</em> with the name of the file you created, excluding the .md extension.</p>
<h2 id="4-publish">4. Publish</h2>
<pre><code className="bash language-bash">{`git push origin main`}</code></pre>
<p>Then open a pull request.</p></div>
            )
        }
    