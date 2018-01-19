const cacheStore = "Drama-1.3";
self.addEventListener("install",(e)=>{
	e.waitUntil(
		caches.open(cacheStore).then((cache)=>{
			return cache.addAll([
				"./",
				"./index.html",
				"./drama.swf.mp3",
				"./manifest.json",
				"https://fonts.gstatic.com/s/pacifico/v12/Q_Z9mv4hySLTMoMjnk_rCfesZW2xOQ-xsNqO47m55DA.woff2",
				"https://fonts.googleapis.com/css?family=Pacifico"
				]).then(()=>self.skipWaiting());
		})
	);
});
self.addEventListener("fetch",(e)=>{
	if (e.request.url.startsWith("https://use.fontawesome.com")){
		e.respondWith(
			caches.match(e.request).then((res)=>{
				return res || fetch(e.request).then((netres)=>{
					return caches.open(cacheStore).then((x)=>{
						x.put(e.request.url,netres.clone());
						return netres;
					});
				});
			})
		);
	} else {	
		e.respondWith(
			caches.match(e.request).then((res)=>{
				return res || fetch(e.request);
			})
		);
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
