const allCaches = ["Drama-1.1"];
self.addEventListener("install",(e)=>{
	e.waitUntil(
		caches.open(allCaches[0]).then((cache)=>{
			return cache.addAll(["./","./index.html","./drama.swf.mp3","./about.html","./manifest.json"]).then(()=>self.skipWaiting());
		})
	);
});
self.addEventListener("fetch",(e)=>{
	let request = e.request.url;
	if (!request.startsWith("https://www.google-analytics.com") || !request.startsWith("https://www.googletagmanager.com")) {
		e.respondWith(
			caches.match(e.request).then((res)=>{
				return res || fetch(e.request).then((netres)=>{
					return caches.open(allCaches[0]).then((cache)=>{
						cache.put(request,netres.clone());
						return netres;
					});
				});
			})
		);
	}
});
self.addEventListener("activate",(e)=>{
	e.waitUntil(
	caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('Drama') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
	)
})
