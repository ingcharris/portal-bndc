// frontend/components/providers/RBProvider.tsx
// Este componente envuelve la aplicación con el proveedor de React Bricks.

'use client';

import { ReactBricks } from 'react-bricks';
import config from '@/src/react-bricks/config';
import React from 'react';

export default function RBProvider({ children }: { children: React.ReactNode }) {
  return <ReactBricks {...config}>{children}</ReactBricks>;
}