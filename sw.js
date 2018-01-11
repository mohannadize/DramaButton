let swVer = 4;

self.addEventListener("install",(e)=>{
	e.waitUntil(
		caches.open("Drama-1").then((cache)=>{
			return cache.addAll(["./","./index.html","./drama.swf.mp3"]).then(()=>self.skipWaiting());
		})
	);
})
self.addEventListener("fetch",(e)=>{
	e.respondWith(
		caches.match(e.request).then(function(cache){
			return cache || fetch(e.request);
		})
	);
})