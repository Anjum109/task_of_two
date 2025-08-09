import { Product } from '@/redux/features/product/productTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const productsApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1/',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        // Get paginated products
        getProducts: builder.query<Product[], { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 8 }) =>
                `products?offset=${(page - 1) * limit}&limit=${limit}`,
            providesTags: ['Product'],
        }),

        // Get all categories
        getCategories: builder.query<{ id: number; name: string }[], void>({
            query: () => 'categories',
        }),

        // Get single product
        getProduct: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: ['Product'],
        }),

        // Create new product
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (newProduct) => ({
                url: 'products/',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Product'],
        }),

        // Update product
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `products/${id}`,
                method: 'PATCH', // ✅ instead of PUT
                body: data
            }),
            invalidatesTags: ['Product']
        }),


        // Delete product
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;
