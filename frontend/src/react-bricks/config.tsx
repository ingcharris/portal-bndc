// frontend/src/react-bricks/config.ts
// Este archivo configura React Bricks para la aplicación.

import React from 'react';
import Link, { type LinkProps } from 'next/link'
import { types } from 'react-bricks';
import MyHeroUnit from '@/bricks/MyHeroUnit';

// Catálogo de bricks
const bricks: types.Brick[] = [MyHeroUnit];

// Tipo local: props de <Link> + atributos de <a>
type LocalLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

// Configuración de React Bricks
const config: types.ReactBricksConfig = {
  appId: process.env.NEXT_PUBLIC_RB_APP_ID!,
  apiKey: process.env.NEXT_PUBLIC_RB_API_KEY!,
  bricks,

  // requeridos por la versión actual
  appRootElement: '#__next',

  renderLocalLink: (({ href, children, ...rest }: LocalLinkProps) => (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )) as types.ReactBricksConfig['renderLocalLink'],

  // navegación genérica (Admin)
  navigate: (path: string) => {
    if (typeof window !== 'undefined') window.location.assign(path)
  },

  // opcionales
  isDarkColorMode: false,
  contentClassName: 'prose max-w-none',
};

export default config;
export { bricks };
