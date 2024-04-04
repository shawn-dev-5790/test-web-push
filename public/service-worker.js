self.addEventListener("push", (event) => {
  console.log("dd");
  const data = event.data.json();
  console.log("Push received:", data);

  // Show notification
  self.registration.showNotification(data.title, {
    body: "This is a push notification",
    icon: "path/to/icon.png", // Replace with the path to your notification icon
  });
});
