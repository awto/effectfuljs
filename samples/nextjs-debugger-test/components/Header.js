import Link from 'next/link'

debugger;
export default function Header() {
  debugger;
  return (
    <div>
      <Link href="/">
        <a style={styles.a}>Home</a>
      </Link>

      <Link href="/about">
        <a className="about" style={styles.a}>About</a>
      </Link>
    </div>
  )
}

const styles = {
  a: {
    marginRight: 10,
  },
}
