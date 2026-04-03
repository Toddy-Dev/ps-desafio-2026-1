var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getArticles } from './api.js';
function renderProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.getElementById('products-container');
        if (!container) {
            console.error("A div products-container não foi encontrada!");
            return;
        }
        container.innerHTML = '<p>Carregando estoque...</p>';
        const articles = yield getArticles();
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
    });
}
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
