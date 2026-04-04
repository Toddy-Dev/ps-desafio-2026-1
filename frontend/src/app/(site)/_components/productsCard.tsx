import { sportsItemType } from "@/types/sportsItem";
import styles from "./productsCard.module.css";

interface ProductsCardProps {
    product: sportsItemType;
}

export default function ProductsCard({ product }: ProductsCardProps) {
    const formattedPrice = Number(product.price).toFixed(2).replace('.', ',');

    return (
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

            <p className={styles.amount}>Estoque: {product.amount} un.</p>

            <button className={styles.button}>
                COMPRAR
            </button>
        </div>
    );
}