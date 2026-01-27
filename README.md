# Sentinel

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
  
## 🔗 Live Demo
🚀 **Try the application live:** [https://sentinel-front-eight.vercel.app/](https://sentinel-front-eight.vercel.app/)

## 📋 About The Project

**Sentinel** is a client-side interface for a real-time system monitoring platform. It provides a responsive dashboard that allows administrators to visualize server health, track system logs, and leverage AI-driven insights for anomaly detection.

This project was developed as a technical initiative to master **real-time communication patterns** and modern web architectures. Specifically, it focuses on the implementation of **WebSockets** using **STOMP** for instant data streaming and handling data from **NoSQL (non-relational)** databases.

### Key Features

* **⚡ Real-Time Monitoring:** Live visualization of system status using WebSockets (STOMP) for sub-second updates on server health.
* **🤖 AI Integration:** Dedicated interface for AI-powered log analysis and system recommendations.
* **📜 Log Management:** Comprehensive view of server logs streamed from a non-relational source.
* **🔔 System Alerts:** Visual feedback and alerts for critical system states and performance thresholds.
* **📱 Responsive Design:** Fully responsive UI built with Bootstrap 5.

## 🛠️ Built With

* **[Angular](https://angular.io/)** (v19) - The web framework used.
* **[Bootstrap 5](https://getbootstrap.com/)** - For styling and responsive layout.
* **[RxJS](https://rxjs.dev/)** - For reactive programming and handling asynchronous data streams.
* **[WebSockets & STOMP](https://stomp-js.github.io/)** - For real-time bidirectional communication.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed:
* **Node.js** (v18 or higher recommended)
* **npm**
* **Angular CLI**

```bash
npm install -g @angular/cli
```

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/salompablo/sentinel-front.git
    cd sentinel-front
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Check `src/app/environments/environment.ts` to ensure the API and WebSocket URLs point to your running backend instance (default is typically `localhost:8080`).

4.  **Run the application**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 📂 Project Structure

* `src/app/components`: UI components including the real-time Dashboard and Alert system.
* `src/app/services`: Core services managing WebSocket connections (`WebSocketService`), AI integration (`AiService`), and Log streaming (`LogService`).
* `src/app/models`: TypeScript interfaces representing the data structures (e.g., `ServerLog`, `SystemStatusDto`).

## 👤 Author

**Pablo Salom Pita**

* GitHub: [@salompablo](https://github.com/salompablo)
* Email: pablosalompita@gmail.com

---
<p align="center">
  Developed to explore advanced concepts in Real-Time Web Architecture and NoSQL integrations.
</p>
