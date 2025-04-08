# 📸 PhotoPic - Progressive Web App

**PhotoPic** is a PWA built with Angular and Node.js that allows photographers to securely log in, manage their profiles, and store data both online and offline.

## 🚀 Features

- 🔐 Google Login via Firebase (OAuth 2.0)
- 🔒 Tokens encrypted with JWE (JSON Web Encryption)
- 🗂️ Local data stored in IndexedDB with AES encryption
- ⚙️ Standalone Angular architecture with lazy loading
- ⚡ Service Worker + Offline support (PWA)
- 🧪 E2E testing with Cypress + Load testing with k6
- 🌍 Deployed via Firebase Hosting

---

## 🛠️ Tech Stack

- **Frontend:** Angular Standalone, Firebase Auth, IndexedDB, CryptoJS
- **Backend:** Node.js, Express, MongoDB, JWT, JWE
- **PWA:** Angular Service Worker + Manifest
- **Testing:** Cypress, k6, OWASP ZAP

---

## 📦 Run the Project

### Frontend

```bash
npm install
ng serve
```

### Backend

[PhotoPic-Backend](https://github.com/ChrisRed20/PhotoPic-Back)

---

## 🧪 Testing

- Run E2E tests in the frontEnd with `npx cypress open`
- Run load tests in the backEnd with `k6 run load-test.js`

---

## 🌐 Live App

[PhotoPic - WebApp](https://photopic-3312f.web.app)

PWA features enabled. Installable and works offline.
