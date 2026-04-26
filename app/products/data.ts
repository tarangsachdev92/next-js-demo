export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand?: string;
  thumbnail?: string;
};

type ProductsResponse = {
  products: Product[];
};

const PRODUCTS_URL = "https://dummyjson.com/products";

export async function getProducts() {
  const response = await fetch(PRODUCTS_URL, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await response.json()) as ProductsResponse;
  return data.products;
}

export async function getProduct(id: string) {
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const response = await fetch(`${PRODUCTS_URL}/${id}`, {
    next: { revalidate: 30 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return (await response.json()) as Product;
}
