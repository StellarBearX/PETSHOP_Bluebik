import Link from "next/link"
export default function Navbar(){
    return(
        <nav>
            {/* icon */}

            {/* linkpage */}
                <ul>
                    <Link href="/"></Link>
                    <Link href="/notifications"></Link>
                    <Link href="/cart"></Link>
                    <Link href="/favorite"></Link>
                </ul>
            {/* search */}

            {/* profile */}
            
        </nav>
    )
}