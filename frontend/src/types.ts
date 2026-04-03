export interface Category {
    id: string;
    name: string;
}

export interface Article {
    id: string;
    name: string;
    brand: string;
    price: number;
    amount: number;
    image: string;
    category_id: string;
    category?: Category;
}
