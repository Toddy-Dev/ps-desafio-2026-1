import styles from "./banner.module.css";

export default function Banner() {
    return (
        <section className={styles.banner}>
            <h1 className={styles.title}>SUPERE SEUS LIMITES</h1>
            <p className={styles.subtitle}>
                A nova coleção Momentum chegou. Equipamentos de alta performance para quem não aceita menos que o topo.
            </p>
            <button className={styles.button}>
                VER LANÇAMENTOS
            </button>
        </section>
    );
}