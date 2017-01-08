Note:
- Chrome never closes notification, and you must set a timeout

Example:
```
notification = new Notification("Hello world!", 
{
  body: "The body",
  icon: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
});
setTimeout(notification.close.bind(this), 1000);
```
