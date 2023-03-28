# 👷 `Worker` Kushki Api Proxy

Este proyecto tiene como objetivo crear un proxy para el API de kushki, usando un solo endpoint poder saltar entre PROD y UAT

[`src/index.js`](https://github.com/dangercris/kushki-api-proxy/blob/main/src/index.ts) tiene el código que hace la magia

#### Requicitos previos

Instalar el cli de [wrangler](https://github.com/cloudflare/wrangler)

```
npm install -g wrangler
```

Instalar depdencias npm

```
npm install
```


Crear KV Store para dev y prod
```
wrangler kv:namespace create "KV_KUSHKI_API_PROXY" --preview && wrangler kv:namespace create "KV_KUSHKI_API_PROXY"
```
Remplazar los id en el archivo [`wrangler.toml`](https://developers.cloudflare.com/workers/wrangler/workers-kv/) y hacer put en el KV


#### Ambiente de desarrollo

Empezar el ambiente de desarrollo [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler dev
```

#### Deploy en produccion

Empezar el ambiente de desarrollo [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler publish
```