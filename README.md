# Catatan Kas

This application was created to record incoming and outgoing cash. For data storage, it uses local storage and there is no need to log in so it can be used quickly when accessing it. Some of the main features at this time are:

- Make records of incoming/outgoing money
- Edit and delete data
- Filter by month
- Export data to xlsx file
- Dark and light themes

Want to try it? You can access it here [catatan-kas-web.vercel.app](https://catatan-kas-web.vercel.app/)


### Installation
First you must install node js and run the command below.

``` bash
  npm install
  npm run dev
```

Duplicate and rename `.env`, then remove `.example` in the file name. adjust the key and ID with `emailjs`. This is to send a feedback message to email.

| key           |
| :--------     |
| VITE_EMAIL_PUBLIC_KEY|
| VITE_EMAIL_SERVICE_ID|
| VITE_EMAIL_TEMPLATE_ID|
