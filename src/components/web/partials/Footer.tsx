import { FooterItem } from "../../../typings/frontend-types";
import { CreditCardIcon, GiftIcon, ShieldIcon } from "../../../utils/Icons";

const footerItems: FooterItem[] = [
  {
    icon: <CreditCardIcon />,
    title: "Pagá con tarjeta o en efectivo",
    body: "Con Mercado Liebre Cash, tenés cuotas sin interés con tarjeta o efectivo en puntos de pago. ¡Y siempre es seguro!",
  },
  {
    icon: <GiftIcon />,
    title: "Envío gratis desde los $ 2.500",
    body: "Solo por estar registrad@ en Mercado Liebre tenés envíos gratis en miles de productos. Es un beneficio de Mercado Puntos.",
  },
  {
    icon: <ShieldIcon />,
    title: "Seguridad, de principio a fin",
    body: "¿No te gusta? ¡Devolvelo! En Mercado Liebre, no hay nada que no puedas hacer, porque estás siempre protegid@.",
  },
];

export default function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center p-2 gap-2">
      <ul className="w-full flex flex-col md:flex-row justify-center items-center p-2 gap-2">
        {footerItems.map((footerItem, index) => (
          <li
            key={footerItem.title + index}
            className="flex flex-col justify-center items-center"
          >
            {footerItem.icon}
            <h4 className="flex text-center">
              <strong>{footerItem.title}</strong>
            </h4>
            <p className="flex text-center">{footerItem.body}</p>
          </li>
        ))}
      </ul>
      <h4 className="flex text-center">
        <strong>Copyright © 1999-2020 MercadoLiebre S.R.L.</strong>
      </h4>
    </footer>
  );
}
