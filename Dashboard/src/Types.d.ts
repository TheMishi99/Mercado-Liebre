export type Product = {
    id: number
    name: string
    altName: string
    price: string
    image: string
}

export type NavItem = {
    title: string
    url: string
    icon?: string
}

export interface MyRoute {
    url: string;
    element: JSX.Element
    title: string;
}