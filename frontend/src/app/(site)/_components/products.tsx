"use client";

import { useEffect, useState } from "react";
import { sportsItemType } from "@/types/sportsItem";
import ProductsCard from "./productsCard";
import styles from "./products.module.css";

export default function Products() {
    const [products, setProducts] = useState<sportsItemType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;

                const response = await fetch(`${apiUrl}/articles`);
                const data = await response.json();

                setProducts(data);
            } catch (error) {
                console.error("Erro ao buscar os produtos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Lançamentos</h2>

            {loading ? (
                <p className={styles.status}>Aguardando o estoque chegar da API...</p>
            ) : products.length === 0 ? (
                <p className={styles.status}>Nenhum produto encontrado.</p>
            ) : (
                <div className={styles.grid}>
                    {products.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}