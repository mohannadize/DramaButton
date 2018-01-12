const cacheStore = "Drama-1.2.3";
self.addEventListener("install",(e)=>{
	e.waitUntil(
		caches.open(cacheStore).then((cache)=>{
			return cache.addAll(["./","./index.html","./drama.swf.mp3","./manifest.json"]).then(()=>self.skipWaiting());
		})
	);
});
self.addEventListener("fetch",(e)=>{
	let request = e.request.url;
	if (!request.startsWith("https://www.google-analytics.com") || !request.startsWith("https://www.googletagmanager.com")) {
		e.respondWith(
			caches.match(e.request).then((res)=>{
				return res || fetch(e.request).then((netres)=>{
					return caches.open(cacheStore).then((cache)=>{
						cache.put(request,netres.clone());
						return netres;
					});
				});
			})
		);
	}else{
		respondWith(fetch(e.request));
	}
});
self.addEventListener("activate",(e)=>{
	e.waitUntil(
	caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('Drama') && cacheStore != cacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
	)
})
