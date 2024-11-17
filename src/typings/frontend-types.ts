export type NavBarItem = {
  title: string;
  url: string;
  condition?: boolean;
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
