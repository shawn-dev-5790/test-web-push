const onRegisterServiceWorker = async () => {
  await navigator.serviceWorker.register("/service-worker.js");
};

const onCheckPermission = async () => {
  const permission = await Notification.requestPermission();

  return permission === "granted";
};

const onSubscribePush = async () => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      "BJWgvm5Oy1hQzoa2R_sOVzx6dijb7Cw_cYfJeAkoj7UNLyv03hRemh4oOxR2ywAHPP7m1DvTWDhpzpBIweknqQc", // Your application server key
  });
  await fetch("https://test-web-push-server.vercel.app/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      Authorization: `Bearer 1111`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

onCheckPermission().then((isPermission) => {
  if (isPermission) {
    onSubscribePush();
  }
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push received:", data);

  self.registration.showNotification(data.title, {
    body: "This is a push notification",
    icon: "path/to/icon.png", // Replace with the path to your notification icon
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow("https://test-web-push-one.vercel.app/") // 특정 URL로 이동
  );
});
