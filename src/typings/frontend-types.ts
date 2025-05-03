export type NavbarItem = {
  id: number;
  condition: boolean;
  url: string;
  title: string;
};

export interface MyRoute {
  url: string;
  element: JSX.Element;
  title: string;
}

export type FooterItem = {
  icon: JSX.Element;
  title: string;
  body: string;
};
