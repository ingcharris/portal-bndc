// frontend/src/bricks/MyHeroUnit.tsx
// Este componente representa una unidad de héroe en la interfaz de usuario.

import React from 'react';
import { Text, RichText, Image, types } from 'react-bricks';

const MyHeroUnit: types.Brick = () => {
  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-center">
      <Image propName="image" alt="Hero image" maxWidth={150} imageClassName="mx-auto rounded-full" />
      <Text
        renderBlock={(props) => <h1 className="text-3xl font-bold mt-4">{props.children}</h1>}
        placeholder="Escribe un título..."
        propName="title"
      />
      <RichText
        renderBlock={(props) => <p className="text-lg text-gray-600 mt-2">{props.children}</p>}
        placeholder="Escribe una descripción..."
        propName="description"
      />
    </div>
  );
};

MyHeroUnit.schema = {
  name: 'my-hero-unit',
  label: 'Hero Unit',
  getDefaultProps: () => ({
    title: 'Título por defecto',
    description: [
      {
        type: 'paragraph',
        children: [{ text: 'Descripción por defecto.' }],
      },
    ],
  }),
  sideEditProps: [],
};

export default MyHeroUnit;