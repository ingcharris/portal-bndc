// frontend/src/app/page.tsx
// Este componente representa la página principal de la aplicación.

import { ReactBricks, PageViewer } from 'react-bricks';
import config from '@/react-bricks/config'; // Importa la configuración de React Bricks

// Función para obtener los datos de la página desde la API de React Bricks
async function getPage() {
  const page = await fetch(
    `https://rest.reactbricks.com/v1/pages/home`,
    {
      headers: { Authorization: `Bearer ${config.apiKey}` },
    }
  ).then((res) => res.json());
  return page;
}

export default async function Page() {
  // Inicializa ReactBricks en el servidor
  const page = await getPage();

  return (
    <ReactBricks
      config={config}
      page={page}
      pageId={page.id}
      isEdit={false} // Vista pública, no editor
    >
      <PageViewer page={page} />
    </ReactBricks>
  );
}
