import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter";

// main.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log(
        "ServiceWorker registration successful with scope: ",
        registration.scope
      );
    } catch (err) {
      alert("ServiceWorker registration failed: " + err);
    }
  });
}

async function subscribeToPushNotifications() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BJWgvm5Oy1hQzoa2R_sOVzx6dijb7Cw_cYfJeAkoj7UNLyv03hRemh4oOxR2ywAHPP7m1DvTWDhpzpBIweknqQc", // Your application server key
      });

      // Send subscription data to server
      await fetch("https://test-web-push-server.vercel.app/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer 1111`,
        },
      });

      console.log("Subscription successful:", JSON.stringify(subscription));
    } catch (err) {
      alert("Failed to subscribe the user: " + err);
    }
  }
}

// Call the function to subscribe user to push notifications
Notification.requestPermission().then((permission) => {
  if (permission !== "granted") return alert("permission:" + permission);
  console.log("푸시 알림 권한이 허용되었습니다.");
  // 푸시 알림을 보낼 수 있는 로직 추가
  subscribeToPushNotifications();
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
