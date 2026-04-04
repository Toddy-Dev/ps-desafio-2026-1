import { categoryType } from "./category"

export type sportsItemType = {
    id: string;
    name: string;
    brand: string;
    price: number;
    year: number;
    image?: string;
    amount: number;
    category_id: string;
    category: categoryType;
}