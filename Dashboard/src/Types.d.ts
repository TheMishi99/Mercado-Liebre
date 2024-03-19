export type Product = {
    id: number
    name: string
    altName: string
    price: string
    image: string
}

export interface MyRoute {
    url: string;
    element: JSX.Element
    title: string;
}