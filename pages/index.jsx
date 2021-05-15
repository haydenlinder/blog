
        import { useEffect, useRef } from 'react'
        import { highlightBlock } from 'highlight.js'
        import Link from 'next/link'
        
        export default function ndex() {
            const ref = useRef()
            useEffect(() => {
                const codeBlocks = ref.current.querySelectorAll('code')
                for(let i = 0; i < codeBlocks.length; i++) {
                    highlightBlock(codeBlocks[i])
                }
            }, [])
            
            return (
                <div ref={ref}><h1 id="welcome-to-blogmd">Welcome To Blog.md!</h1>
<p>Where blog posts are written in markdown.</p>
<p>If you'd like to add something, please see <Link href='/contributing'>contributing</Link>.</p>
<p><br/></p>
<hr />
<p><br/></p>
<h1 id="posts">Posts</h1>
<p>{require('../scripts/manifest').map(title => <h2 key={title}><Link href={'/' + title}>{title}</Link></h2>)}</p></div>
            )
        }
    