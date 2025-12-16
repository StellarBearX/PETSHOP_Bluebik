import Link from "next/link"
export default function Navbar(){
    return(
        <nav>
            {/* icon */}

            {/* linkpage */}
                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/notifications">Notification</Link>
                    <Link href="/cart">Cart</Link>
                    <Link href="/favorite">Favorite</Link>
                </ul>
            {/* search */}

            {/* profile */}
            
        </nav>
    )
}