import Link from 'next/link'

export default function MenuItems({ titles }) {
    return (
        <div>
            <Link href='/' passHref>
                <a>Home</a>
            </Link>
            {titles.map(
                title => 
                <div key={title}>
                    <Link href={`/${title}`} passHref>
                        <a>{title}</a>
                    </Link>
                </div>
            )}
        </div>
    )
}