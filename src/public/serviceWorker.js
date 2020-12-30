console.log('Service Worker loaded.')

self.addEventListener('push', (e) => {
    var data = e.data.json()
    console.log(data)
    const notification = self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://www.flaticon.es/svg/static/icons/svg/1646/1646781.svg'
    })
    e.waitUntil(notification)
})