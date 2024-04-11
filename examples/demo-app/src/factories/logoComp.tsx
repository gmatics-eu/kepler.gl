import React from 'react';

// Definizione dei tipi delle props accettate dal componente
declare type LogoComponentProps = {
    appName: string;
    appWebsite: string;
    version: string;
};
// Definizione della variabile di tipo React.FC<LogoComponentProps>
const LogoComponent: React.FC<LogoComponentProps> = ({ appName, appWebsite,version }) => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <img style={{objectFit:'cover',width:"90%", height:"100%"}} src='./public/images/gmatics_logo_large.gif' ></img>
    </div>
    // Altri elementi o logica del componente
  );
};

export default LogoComponent;
