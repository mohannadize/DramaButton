let swVer = 2;

self.addEventListener("install",(e)=>{
	e.waitUntil(
		caches.open("Drama").then((cache)=>{
			return cache.addAll(["./","./index.html","./drama.swf.mp3"]).then(()=>self.skipWaiting());
		})
	);
});
self.addEventListener("fetch",(e)=>{
	let request = e.request.url;
	e.respondWith(
		caches.match(e.request).then((res)=>{
			return res || fetch(e.request).then((netres)=>{
				return caches.open("Drama").then((cache)=>{
					cache.put(request.url,netres.clone());
					return netres;
				});
			});
		})
	);
})