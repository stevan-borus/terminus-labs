import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_Dkxd5onk.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_xJeBKm5w.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/stevanborus/Desktop/terminus-labs/","cacheDir":"file:///Users/stevanborus/Desktop/terminus-labs/node_modules/.astro/","outDir":"file:///Users/stevanborus/Desktop/terminus-labs/dist/","srcDir":"file:///Users/stevanborus/Desktop/terminus-labs/src/","publicDir":"file:///Users/stevanborus/Desktop/terminus-labs/public/","buildClientDir":"file:///Users/stevanborus/Desktop/terminus-labs/dist/client/","buildServerDir":"file:///Users/stevanborus/Desktop/terminus-labs/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/stevanborus/Desktop/terminus-labs/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/stevanborus/Desktop/terminus-labs/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["/Users/stevanborus/Desktop/terminus-labs/src/pages/terms.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CyPOKAjs.mjs","/Users/stevanborus/Desktop/terminus-labs/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_ovOpDifz.mjs","/Users/stevanborus/Desktop/terminus-labs/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.BKhWja5z.js","/Users/stevanborus/Desktop/terminus-labs/src/components/Contact.astro?astro&type=script&index=0&lang.ts":"_astro/Contact.astro_astro_type_script_index_0_lang.DeRg4zWF.js","/Users/stevanborus/Desktop/terminus-labs/src/components/Nav.astro?astro&type=script&index=0&lang.ts":"_astro/Nav.astro_astro_type_script_index_0_lang.BTX_s0_a.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/stevanborus/Desktop/terminus-labs/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","const l=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add(\"animate-in\"),l.unobserve(t.target))})},{threshold:.1,rootMargin:\"0px 0px -40px 0px\"});document.querySelectorAll(\"[data-animate]\").forEach(e=>{l.observe(e)});const n=document.querySelector(\"[data-nav]\");if(n){const e=()=>{window.scrollY>50?n.classList.add(\"nav-scrolled\"):n.classList.remove(\"nav-scrolled\")};window.addEventListener(\"scroll\",e,{passive:!0}),e()}const r=document.querySelectorAll(\"[data-parallax]\");if(r.length>0){let e=!1;window.addEventListener(\"scroll\",()=>{e||(requestAnimationFrame(()=>{const t=window.scrollY;r.forEach(a=>{const s=parseFloat(a.dataset.parallax||\"0.5\");a.style.transform=`translateY(${t*s}px)`}),e=!1}),e=!0)},{passive:!0})}document.querySelectorAll(\".btn-magnetic\").forEach(e=>{const t=e;t.addEventListener(\"mousemove\",a=>{const s=t.getBoundingClientRect(),o=a.clientX-s.left-s.width/2,c=a.clientY-s.top-s.height/2;t.style.transform=`translate(${o*.15}px, ${c*.15}px)`}),t.addEventListener(\"mouseleave\",()=>{t.style.transform=\"translate(0, 0)\"})});"],["/Users/stevanborus/Desktop/terminus-labs/src/components/Contact.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"contact-form\"),a=document.querySelector(\"[data-btn-text]\"),o=document.querySelector(\"[data-btn-icon]\"),c=document.querySelector(\"[data-btn-spinner]\"),t=document.querySelector(\"[data-form-status]\"),r=e?.querySelector('button[type=\"submit\"]');e?.addEventListener(\"submit\",async d=>{d.preventDefault(),a.textContent=\"Sending...\",o.classList.add(\"hidden\"),c.classList.remove(\"hidden\"),r.disabled=!0,t.textContent=\"\",t.className=\"text-sm\";const n=new FormData(e),m={name:n.get(\"name\"),email:n.get(\"email\"),message:n.get(\"message\")};try{const s=await fetch(\"/api/contact\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(m)}),i=await s.json();s.ok?(t.textContent=\"Message sent successfully!\",t.className=\"text-sm text-emerald-400\",e.reset()):(t.textContent=i.error||\"Something went wrong.\",t.className=\"text-sm text-red-400\")}catch{t.textContent=\"Network error. Please try again.\",t.className=\"text-sm text-red-400\"}finally{a.textContent=\"Send Message\",o.classList.remove(\"hidden\"),c.classList.add(\"hidden\"),r.disabled=!1}});"],["/Users/stevanborus/Desktop/terminus-labs/src/components/Nav.astro?astro&type=script&index=0&lang.ts","const t=document.querySelector(\"[data-mobile-toggle]\"),e=document.querySelector(\"[data-mobile-menu]\"),o=document.querySelectorAll(\"[data-mobile-link]\");t&&e&&(t.addEventListener(\"click\",()=>{t.classList.toggle(\"open\"),e.style.maxHeight&&e.style.maxHeight!==\"0px\"?e.style.maxHeight=\"0px\":e.style.maxHeight=e.scrollHeight+\"px\"}),o.forEach(l=>{l.addEventListener(\"click\",()=>{t.classList.remove(\"open\"),e.style.maxHeight=\"0px\"})}));"]],"assets":["/_astro/index.ClQodXjI.css","/favicon.ico","/favicon.svg","/noise.svg","/privacy-policy/index.html","/terms/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"MwDm+C3v5P2PZIAoqnhd9mVZJijgWuBBqdpxYUdTSPU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
