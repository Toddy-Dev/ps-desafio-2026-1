
import { getArticles } from './api.js';
import { Article } from './types.js';

async function renderProducts() {
    const container = document.getElementById('products-container');

    if (!container) {
        console.error("A div products-container não foi encontrada!");
        return;
    }

    container.innerHTML = '<p>Carregando estoque...</p>';

    const articles: Article[] = await getArticles();

    container.innerHTML = '';

    if (articles.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado no estoque no momento.</p>';
        return;
    }

    articles.forEach(article => {
        const priceFormatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(article.price);

        const cardHTML = `
            <div class="card">
                ${article.image ? `<img src="${article.image}" alt="${article.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;">` : `<div style="width: 100%; height: 150px; background: #eee; border-radius: 4px;"></div>`}
                
                <h3>${article.name}</h3>
                <p style="color: #666; font-size: 14px;">${article.brand}</p>
                <p class="price">${priceFormatted}</p>
                <p style="font-size: 12px; color: #888;">Estoque: ${article.amount} un.</p>
                
                <button style="width: 100%; padding: 10px; background: #16a34a; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 10px;">
                    COMPRAR
                </button>
            </div>
        `;

        container.innerHTML += cardHTML;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});