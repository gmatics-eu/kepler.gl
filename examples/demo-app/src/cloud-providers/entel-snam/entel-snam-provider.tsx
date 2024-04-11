import { Provider } from "@kepler.gl/cloud-providers";
import {ENTEL_SNAM_GASDOTTI_DIR_PATH} from "../../ambientVariable";

const NAME = "gasdotti ";
const DISPLAY_NAME = "snam gasdotti ";
const components: any = {};

// Importa tutti i file dalla directory 'components'

declare const require: any;

let context: { (arg0: string): any; (arg0: string): any; keys: any; };

if (ENTEL_SNAM_GASDOTTI_DIR_PATH) {
  // Utilizza la variabile d'ambiente se definita
  context = require.context(
      process.env.ENTEL_SNAM_GASDOTTI_DIR_PATH,
      true,
      /\.geojson$/
  );
} else {
  // Utilizza il percorso hardcoded altrimenti
  context = require.context(
      "../../data/entel/gasdotti",
      true,
      /\.geojson$/
  );
}


const Files: fileObject[] = [];

const orderedKeys = context.keys().sort((a: string, b: string) => {
  const numA = parseInt(a.replace("./Gasdotto_", "").replace(".json", ""));
  const numB = parseInt(b.replace("./Gasdotto_", "").replace(".json", ""));
  return numA - numB;
});

orderedKeys.forEach((key: string) => {
  components[key] = context(key);
  console.log("key", context(key));
  Files.push({
    filejson: components[key],
    fileName: key.replace("./", "").replace(".geojson", ""),
  });
});

//export default components;

type fileObject = {
  fileName: string;
  filejson: any;
};

type Map = {
  datasets: { info: { label: string; id: string }; data: any }[];
  config: {};
  option?: {};
  info: { app: string; created_at: string; title: string; description: string };
};

export class SnamProviderClass extends Provider {
  constructor(
    icon: any,
    thumbnail: { width: number; height: number },
    auth: any,
    name: string = NAME,
    displayName: string  = DISPLAY_NAME,
  ) {
    //icon=undefined;

    super({ name, displayName, icon, thumbnail });
    this.auth = auth;
  }

  private auth: any;

  public localSetAuth(auth: any) {
    this.auth = auth;
  }

  public override async login(onCloudLoginSuccess: () => void) {
    let auth = this.auth;

    if (auth)
      auth
        .signinPopup()
        .then((user: any) => {
          this.auth.user = user;
          if (user.access_token) onCloudLoginSuccess();
          if (process.env.NODE_ENV === "development") {
            console.debug("Signed in:", auth.user);
          }
        })
        .catch((e: any) => {
          console.error(e);
        });
  }

  public override async logout(onCloudLogoutSuccess: () => void) {
    let auth = this.auth;

    if (auth)
      auth
        .signoutSilent()
        .then(() => {
          onCloudLogoutSuccess();
        })
        .catch((e: any) => {
          console.error(e);
        });
  }

  public override async downloadMap(loadParams: any): Promise<any> {
    return loadParams;
  }

  public override async listMaps() {
    return Files.map((f, i) => {
      const FileName = f.fileName;
      const Label = FileName.split("_").join(" ");

      const Map: Map = {
        datasets: [
          {
            info: { label: Label, id: FileName + "_id_" + i },
            data: f.filejson,
          },
        ],
        option: {
          centerMap: true,
          readOnly: false,
        },
        config: {},
        info: {
          app: "Gmatics ",
          created_at: "",
          title: Label,
          description: "mappa " + Label,
        },
      };

      return {
        id: FileName,
        title: Label,
        description: "mappa " + Label,
        thumbnail:
          "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/EU-Italy.svg/1024px-EU-Italy.svg.png",
        lastModification: 1699978905536,
        privateMap: true,
        loadParams: { map: Map, format: "geojson" },
      };
    });
  }

  public override getAccessToken = () => {
    // TODO  gestire gli scope.
    if (this.auth.user) return true;
    return false;
  };
}
