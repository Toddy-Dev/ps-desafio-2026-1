"use client";

import { useEffect, useState } from "react";
import { sportsItemType } from "@/types/sportsItem";
import ProductsCard from "./productsCard";
import styles from "./products.module.css";

interface ProductsProps {
    selectedCategory: string | null;
}

export default function Products({ selectedCategory }: ProductsProps) {
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

    const filteredProducts = selectedCategory
        ? products.filter((product) =>
            product.category?.name.toLowerCase() === selectedCategory.toLowerCase()
        )
        : products;
    console.log("Categoria Selecionada no clique:", selectedCategory);
    console.log("Um produto da API para a gente espiar:", products[0]);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>
                {selectedCategory ? `Lançamentos: ${selectedCategory}` : "Lançamentos"}
            </h2>

            {loading ? (
                <p className={styles.status}>Aguardando o estoque chegar da API...</p>
            ) : filteredProducts.length === 0 ? (
                <p className={styles.status}>
                    {selectedCategory
                        ? `Nenhum produto encontrado na categoria ${selectedCategory}.`
                        : "Nenhum produto encontrado no sistema."}
                </p>
            ) : (
                <div className={styles.grid}>
                    {filteredProducts.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}