!function(){"use strict"
self.addEventListener("install",()=>{self.skipWaiting()}),self.addEventListener("activate",()=>{self.clients.matchAll().then(e=>{e.forEach(e=>{e.navigate(e.url)})})})}()
