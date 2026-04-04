import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoArea}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    MOMENTUM
                </Link>
            </div>

            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>Início</Link>
                <Link href="#" className={styles.navLink}>Masculino</Link>
                <Link href="#" className={styles.navLink}>Feminino</Link>
                <Link href="#" className={styles.navLink}>Acessórios</Link>
            </nav>

            <div className={styles.authButtons}>
                <button className={styles.loginBtn}>Entrar</button>
            </div>
        </header>
    );
}