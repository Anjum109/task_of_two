export type Category = {
    id: number | string;
    name: string;
};

export type Product = {
    id: number | string;
    title: string;
    price: number;
    description?: string;
    category?: Category | string;
    image?: string;
    stock?: number;
    rating?: {
        rate: number;
        count: number;
    };
    createdAt?: string;
};
