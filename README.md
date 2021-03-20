# AdminPanel

![AdminPanel version](https://img.shields.io/badge/AdminPanel-0.1.0-green.svg)
[![License](https://img.shields.io/badge/license-MIT-red.svg)](https://opensource.org/licenses/MIT)

Simple application to monitor server parameters, like healthcheck and performance metrics.

Two separated instances:
- first (server) - collects the data and stores using Redis;
- second (panel) - the proper admin panel.

Project written using Next.js (Node.js framework with React on frontend).

![Home preview](https://cdn.kon.ovh/pub/admin-panel_home.png)

compile TypeScript:
```
npm run build
```

run server instance:
```
npm run server
```

run panel instance:
```
npm run panel -- --port 3000
```

![Health check preview](https://cdn.kon.ovh/pub/admin-panel_health-check.png)
![Statistics preview](https://cdn.kon.ovh/pub/admin-panel_statistics.png)
