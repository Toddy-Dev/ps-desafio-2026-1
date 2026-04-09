"use client";

import { useState } from "react";
import { sportsItemType } from "@/types/sportsItem";
import styles from "./productsCard.module.css";

interface ProductsCardProps {
    product: sportsItemType;
}

export default function ProductsCard({ product }: ProductsCardProps) {
    const [currentAmount, setCurrentAmount] = useState(product.amount);
    const [isAdding, setIsAdding] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const formattedPrice = Number(product.price).toFixed(2).replace('.', ',');

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const confirmPurchase = async () => {
        setShowModal(false);
        setIsAdding(true);

        const previousAmount = currentAmount;
        setCurrentAmount(prev => prev - 1);

        try {
            const response = await fetch(`http://localhost:8000/articles/${product.id}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro na requisição");
            }

            if (data.article && data.article.amount !== undefined) {
                setCurrentAmount(data.article.amount);
            }

            alert("✅ " + data.message);

        } catch (error: any) {
            console.error("Erro ao comprar:", error);
            setCurrentAmount(previousAmount);
            alert(`❌ Erro: ${error.message}`);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <>
            <div className={styles.card}>
                <div className={styles.imagePlaceholder}>
                    {product.image ? (
                        <img src={product.image} alt={product.name} className={styles.image} />
                    ) : (
                        <span>Sem Imagem</span>
                    )}
                </div>

                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.brand}>{product.brand}</p>
                <p className={styles.price}>R$ {formattedPrice}</p>
                <p className={styles.amount}>Estoque: {currentAmount} un.</p>

                <button
                    className={styles.button}
                    onClick={handleOpenModal}
                    disabled={isAdding || currentAmount <= 0}
                >
                    {isAdding ? "PROCESSANDO..." : currentAmount <= 0 ? "ESGOTADO" : "COMPRAR"}
                </button>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3 className={styles.modalTitle}>Confirmar Compra</h3>
                        <p className={styles.modalText}>
                            Deseja Comprar <strong>{product.name}</strong> ?
                        </p>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.btnCancel}
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className={styles.btnConfirm}
                                onClick={confirmPurchase}
                            >
                                Sim, Comprar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}