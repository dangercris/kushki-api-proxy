export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;

  KV_KUSHKI_API_PROXY: KVNamespace;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const TARGETS = {
      PROD: "api.kushkipagos.com",
      UAT: "api-uat.kushkipagos.com",
    };

    // Get
    const originalPublicMerchantId = request.headers.get("Public-Merchant-Id");
    const url = new URL(request.url);
    url.hostname = TARGETS.PROD;

    console.log("original => ", originalPublicMerchantId);

    if (originalPublicMerchantId) {
      const newPublicMerchantId = await env.KV_KUSHKI_API_PROXY.get(
        originalPublicMerchantId
      );

      const newRequest = new Request(request);

      if (newPublicMerchantId) {
        url.hostname = TARGETS.UAT;
        newRequest.headers.set("Public-Merchant-Id", newPublicMerchantId);
      }

      const response = await fetch(url.toString(), newRequest);
      const newResponse = new Response(response.body, response);

      newResponse.headers.append("x-kushki-api-proxy", TARGETS.UAT);
      newResponse.headers.append(
        "x-Public-Merchant-Id",
        newPublicMerchantId || ""
      );
      return newResponse;
    }

    return await fetch(url.toString(), request);
  },
};
