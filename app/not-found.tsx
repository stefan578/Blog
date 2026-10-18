import Link from "next/link";
export default function NotFound() { return <section className="empty-state page-empty"><span className="empty-star">✳</span><p className="eyebrow">404</p><h1>Page not <em>found.</em></h1><p>That address doesn’t seem to lead anywhere.</p><Link className="button button-dark" href="/">Go to the homepage <span>↗</span></Link></section>; }
