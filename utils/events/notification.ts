export function NotificationHandler(createNotification) {
  let notificationWorks = [];
  let timeout = null;
  this.notification = null;

  this.requestPermission = async () => {
    const permission = await Notification.requestPermission(res => res);

    if (permission === "granted")
      return new Notification("알림이 허용되었습니다.");
  };

  this.checkPermission = () => {
    const permission = Notification.permission;
    if (permission === "granted") return true;
    if (permission === "default") return false;
    if (permission === "denied") return false;
  };

  this.removeTimeout = () => clearTimeout(timeout);

  this.activeNotification = data => {
    if (!this.checkPermission()) return;
    this.removeTimeout();
    notificationWorks.push(data);
    timeout = setTimeout(() => {
      this.notification?.close.bind(this.notification);
      const { title, option } = createNotification(notificationWorks);
      this.notification = new Notification(title, option);
      notificationWorks = [];
    }, 300);
  };
}
