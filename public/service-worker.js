self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push received:", data);

  // Show notification
  self.registration.showNotification(data.title, {
    body: "This is a push notification",
    icon: "path/to/icon.png", // Replace with the path to your notification icon
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow("https://test-web-push-one.vercel.app/") // 특정 URL로 이동
  );
});
