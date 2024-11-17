import { VITE_API_URL } from "../config/app.config";
import {
  ApiDeleteProductResponse,
  ApiErrorResponse,
  ApiProductResponse,
  ApiProductsResponse,
  ApiUpdateProductResponse,
} from "../typings/backend-api-types";
import { ProductType } from "../typings/backend-types";

export async function fetchProducts(): Promise<[string | null, ProductType[]]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products`, {
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiProductsResponse: ApiProductsResponse = await response.json();
    return [null, apiProductsResponse.products];
  } catch (error) {
    if (error instanceof Error) return [error.message, []];
    return ["Unknown Error", []];
  }
}

export async function fetchProduct({
  id,
}: {
  id: string;
}): Promise<[string | null, ProductType | null]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiProductResponse: ApiProductResponse = await response.json();
    return [null, apiProductResponse.product];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Unknown Error", null];
  }
}

export async function createProduct({
  data,
}: {
  data: FormData;
}): Promise<[string | null, ProductType | null]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products`, {
      body: data,
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiProductResponse: ApiProductResponse = await response.json();
    return [null, apiProductResponse.product];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Unknown Error", null];
  }
}

export async function updateProduct({
  id,
  data,
}: {
  id: string;
  data: FormData;
}): Promise<[string | null, ProductType | null]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products/${id}`, {
      body: data,
      method: "PATCH",
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiUpdateProductResponse: ApiUpdateProductResponse =
      await response.json();
    return [null, apiUpdateProductResponse.updated_product];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Unknown Error", null];
  }
}

export async function deleteProduct({
  id,
}: {
  id: string;
}): Promise<[string | null, boolean]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiDeleteProductResponse: ApiDeleteProductResponse =
      await response.json();
    return [null, apiDeleteProductResponse.ok];
  } catch (error) {
    if (error instanceof Error) return [error.message, false];
    return ["Unknown Error", false];
  }
}
