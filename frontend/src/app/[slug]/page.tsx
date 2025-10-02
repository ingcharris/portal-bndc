// frontend/src/app/[slug]/page.tsx
// Este componente carga y muestra una página de React Bricks basada en el slug de la URL.

import { PageViewer } from 'react-bricks';
import RBProvider from '@/src/components/providers/RBProvider';
import config from '@/src/react-bricks/config';
import { notFound } from 'next/navigation';

async function getPage(slug: string) {
  const res = await fetch(`https://rest.reactbricks.com/v1/pages/${slug}`, {
    headers: { Authorization: `Bearer ${config.apiKey}` },
    // cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  if (!page) notFound();

  return (
    <RBProvider>
      <PageViewer page={page} />
    </RBProvider>
  );
}