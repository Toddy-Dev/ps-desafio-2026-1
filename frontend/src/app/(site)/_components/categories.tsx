import Image from "next/image";
import styles from "./categories.module.css";

import imgTenis from "./assets/tenis.webp";
import imgChuteira from "./assets/chuteira.webp";
import imgBarraca from "./assets/barraca.webp";
import imgBola from "./assets/bola.png";
import imgMochila from "./assets/mochila.webp";
import imgFitnes from "./assets/fitness.webp";
import imgBicicleta from "./assets/bicicleta.webp";
import imgNatacao from "./assets/natacao.webp";
import { Dispatch, SetStateAction } from 'react';


interface CategoriesProps {
    selectedCategory: string | null;
    onSelectCategory: Dispatch<SetStateAction<string | null>>;
}

export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
    const categories = [
        { id: 1, name: 'Tênis', image: imgTenis },
        { id: 2, name: 'Chuteiras', image: imgChuteira },
        { id: 3, name: 'Barracas', image: imgBarraca },
        { id: 4, name: 'Bolas', image: imgBola },
        { id: 5, name: 'Mochilas', image: imgMochila },
        { id: 6, name: 'Fitness', image: imgFitnes },
        { id: 7, name: 'Bicicletas', image: imgBicicleta },
        { id: 8, name: 'Natação', image: imgNatacao },
    ];

    return (
        <section className={styles.container}>
            <div className={styles.scrollRow}>
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.name;
                    const isFaded = selectedCategory !== null && !isSelected;

                    return (
                        <div
                            key={category.id}
                            className={styles.item}
                            onClick={() => onSelectCategory(isSelected ? null : category.name)}
                            style={{
                                cursor: 'pointer',
                                opacity: isFaded ? 0.4 : 1,
                                transition: 'opacity 0.3s'
                            }}
                        >
                            <div className={styles.circle}>
                                <Image
                                    src={category.image}
                                    alt={`Categoria ${category.name}`}
                                    className={styles.categoryImage}
                                    placeholder="blur"
                                />
                            </div>
                            <span className={styles.name} style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                                {category.name}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    );
}