const form=document.querySelector("#subscribeForm"),price=document.querySelector("#price"),btn=document.querySelector("#subscribeButton"),urlBase64ToUint8Array=e=>{const r=(e+"=".repeat((4-e.length%4)%4)).replace(/-/g,"+").replace(/_/g,"/"),t=window.atob(r),i=new Uint8Array(t.length);for(let e=0;e<t.length;++e)i[e]=t.charCodeAt(e);return i},subscribe=async e=>{if(e.preventDefault(),!price.value)return void alert("Please fill in all the required fields!");const r=await navigator.serviceWorker.register("/sw.js"),t=await r.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:urlBase64ToUint8Array(vapidKey)});btn.innerHTML="Subscribed!",await fetch("/subscribe",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({subscription:t,symbol:symbol,price:price.value})})};"serviceWorker"in navigator&&(form.addEventListener("submit",subscribe),form.style.display="block");