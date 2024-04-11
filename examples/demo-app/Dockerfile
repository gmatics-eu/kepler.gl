# Usa un'immagine di Node.js per costruire il bundle
FROM node:14 as builder

# Definizione delle variabili come ARG per la fase di build
ARG MapboxAccessToken
ARG CLIENT_ID
ARG AUTHORITY
ARG SCOPE
ARG AUDIENCE
ARG ENTEL_SNAM_GASDOTTI_DIR_PATH

# Impostazione delle variabili come ENV per l'ambiente di runtime
ENV MapboxAccessToken=${MapboxAccessToken}
ENV CLIENT_ID=${CLIENT_ID}
ENV AUTHORITY=${AUTHORITY}
ENV SCOPE=${SCOPE}
ENV AUDIENCE=${AUDIENCE}
ENV ENTEL_SNAM_GASDOTTI_DIR_PATH=${ENTEL_SNAM_GASDOTTI_DIR_PATH}

WORKDIR /usr/src/app

# Copia i file sorgente e installa le dipendenze
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn build

# Usa un'immagine leggera come base per il server web (nginx)
FROM nginx:stable-alpine

# Copia il bundle generato da Webpack nell'immagine nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copia il tuo index.html specifico
COPY index.html /usr/share/nginx/html

# Espone la porta 80 per consentire l'accesso al server web
EXPOSE 80
