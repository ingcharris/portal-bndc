// frontend/src/app/admin/editor/page.tsx
// Este componente es el editor de React Bricks para la administración de contenido.

'use client';

import { Admin, types } from 'react-bricks';
import { useRouter } from 'next/navigation';
import baseConfig from '@/react-bricks/config';

export default function AdminEditor() {
  const router = useRouter();

  const adminConfig: types.ReactBricksConfig = {
    ...baseConfig,
    navigate: (path: string) => router.push(path), // sobreescribe navigate con Next Router
  };

  return <Admin {...adminConfig} />; // ✅ en lugar de <Admin config={...} />
}