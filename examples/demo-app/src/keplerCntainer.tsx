import { useAuth } from "react-oidc-context";
import { SnamProviderClass } from "./cloud-providers/entel-snam/entel-snam-provider";
import React from "react";
import { IconComponent } from "./cloud-providers/entel-snam/entel-snam-icon";
import {MAPBOX_API_ACCESS_TOKEN} from "./ambientVariable";

export const KeplerContainer: React.FC<React.PropsWithChildren<any>> = ({
  keplerGlGetState,
  width,
  height,
  messages,
  onExportFileSuccess,
  onLoadCloudMapSuccess,
  DEFAULT_FEATURE_FLAGS,
  KeplerGl,
}) => {
  const Auth = useAuth();

  const entelProvider = new SnamProviderClass(
      IconComponent,
      { width: 300, height: 200 },
      Auth
  )

  return (
    <KeplerGl
      mapboxApiAccessToken={
        MAPBOX_API_ACCESS_TOKEN
      }
      id="map"
      /*
       * Specify path to keplerGl state, because it is not mount at the root
       */
      getState={keplerGlGetState}
      width={width}
      height={height}
      cloudProviders={[
        entelProvider,
      ]}
      localeMessages={messages}
      onExportToCloudSuccess={onExportFileSuccess}
      onLoadCloudMapSuccess={onLoadCloudMapSuccess}
      featureFlags={DEFAULT_FEATURE_FLAGS}
    />
  );
};
