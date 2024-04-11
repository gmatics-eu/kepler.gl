import React, { ComponentType } from 'react';

export interface IconProps {
    height?: string;
    width?: string;
}

const ImageIcon: React.FC<IconProps> = (props) => {
  // Puoi personalizzare il rendering dell'immagine a seconda delle tue esigenze
  return (
    <img
      src="https://www.industriaitaliana.it/wp-content/uploads/2020/01/Snam_logo.jpg"
      alt="Snam logo"
      width={props.width}
      height={props.height}
      {...props} // Puoi passare tutte le props ricevute a <img>
    />
  );
};

// Usa ComponentType per definire il tipo del componente
export const IconComponent: ComponentType<IconProps> = ImageIcon;

