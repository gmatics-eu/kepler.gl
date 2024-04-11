  // TODO variabili d'ambiente dinamiche non funzionano perchè l'app viene bundled con webpack,
  // trovare modo per passare le configurazioni in maniera dinamica
  export const authFromAmbient={
    client_id: "N5LUGf0YFkyRjmvEemHH0ldyKq0EMrvG",
    authority: "https://gmatics.eu.auth0.com/login",
    scope: "openid email profile read:dataset:gasdotti",
    extraQueryParams: {
      audience: "https://snam-entel.gmatics.eu",
    },
  }

  export const MAPBOX_API_ACCESS_TOKEN = "pk.eyJ1IjoibHVjYTEybW9zY2EiLCJhIjoiY2xueGI4bmgyMGZidzJpb3Zsc3lzbW40diJ9.teLfm2DKrGwz-jwjKL_duA"
  // export const ENTEL_SNAM_GASDOTTI_DIR_PATH = process.env.ENTEL_SNAM_GASDOTTI_DIR_PATH