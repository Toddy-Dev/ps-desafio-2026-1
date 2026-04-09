"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDark]);

    return (
        <header className={styles.header}>
            <div className={styles.logoArea}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    MOMENTUM
                </Link>
            </div>

            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>Início</Link>
                <Link href="#lancamentos" className={styles.navLink}>Produtos</Link>
            </nav>

            <div className={styles.authButtons}>
                <button
                    onClick={() => setIsDark(!isDark)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                    {isDark ? '☀️' : '🌙'}
                </button>

                <Link href="/admin" className={styles.adminLink}>Painel Admin</Link>
                <button className={styles.loginBtn}>Entrar</button>
            </div>
        </header>
    );
}