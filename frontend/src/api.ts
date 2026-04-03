
import { Article, Category } from './types.js';

export const API_URL = 'http://127.0.0.1:8000';

export async function getArticles(): Promise<Article[]> {
    try {
        const response = await fetch(`${API_URL}/articles`);

        if (!response.ok) {
            throw new Error('Falha ao buscar os artigos');
        }

        const data: Article[] = await response.json();
        return data;
    } catch (error) {
        console.error("Erro na API:", error);
        return [];
    }
}