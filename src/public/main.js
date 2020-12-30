const PUBLIC_VAPID_KEY = 'BPRmo2-NV3zpItA9hmO9pFsx4J8OdKfQPuGZs3aw1_jlKvSzHBPCfm4gTUoMFGyD50f5vFF3Td2hosOTD6xWry4'

// if (!("Notification" in window)) {
//     alert("Este navegador no soporta notificaciones.")
// } else {
//     alert("Este navegador soporta notificaciones.")
//     Notification.requestPermission().then(response => {
//         console.log(response)
//         if (response === 'granted') {
//             console.log("In granted")
//             new Notification("Notificacion de prueba.")
//         }
//     })
// }

const suscripcion = async () => {

    const register = await navigator.serviceWorker.register('serviceWorker.js', {
            scope: '/notificaciones-push/src/public'
    })

    const suscripcion = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    })

    await fetch('/suscripcion', {
        method: 'POST',
        body: JSON.stringify(suscripcion),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => {
        console.log("Success", response)
    }).catch(console.log)
    console.log("Suscrito")
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const form = document.querySelector('#miForm')
const message = document.querySelector('#message')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({
            message: message.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
})

form.reset()

suscripcion()