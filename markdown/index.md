# Welcome To Blog.md! 

Where blog posts are written in markdown.

If you'd like to add something, please see <Link href='/contributing'>contributing</Link>.


<br/>

---

<br/>

# Posts

{require('../scripts/manifest').map(title => <h2 key={title}><Link href={'/' + title}>{title}</Link></h2>)}
