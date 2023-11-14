# Kaichou Graduation Project

The Kaichou Project is a graduation tribute website for the VTuber [Kiryu Coco](https://www.youtube.com/channel/UCS9uQI-jC3DE0L4IpXyvr6w).

## Setup

To set up and run the project you will need to have [node](https://nodejs.org/en/) installed.

First run `npm install` and wait for the dependencies to finish installing.

Lastly you should be able to start the project by simply running `npm start`.

_Note_: Assuming that you will be accessing the "mobile app" in the browser, you should toggle the device to set it to mobile to get a proper view of the app (since the default view is web).

**Optional**: To get linting to work in your IDE of choice (for example VSCode), install the [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugins.

## Project Structure

The project is currently split into a frontend and backend repo.

Both frontend and backend are using JavaScript.

#### Frontend Folder Structure

```
├───.vscode
├───public
├───src
    ├───assets
    ├───components
    ├───pages
    ├───services (Gets data from the backend)
    ├───store
    ├───theme
    ├───utils
    ├───App.css
    └───App.test.tsx
    └───(other config files that you won't bother with)
├───.gitignore
├───package.json
├───package-lock.json
├───capacitor.config.json
├───tsconfig.json
└───ionic.config.json
```

Folders and files explanation:

- `.vscode` => optional VS code config.
- `src` => stores all frontend pages
- `App.tsx` => Where routing is configured (place all routes here)
- `index.tsx` => entry point for the mobile app
- `assets` => store assets used (ACS logo)
- `components` => stores reusable components used in pages
- `pages` => stores individual pages for the mobile app
- `store` => where the [stores](https://github.com/pmndrs/zustand#first-create-a-store) reside
- `services` => where you store any logic code related to data processing before it is saved or fetched from DB
- `utils` => folder for util functions (for convenience)

#### Stack

_Ionic React_ - native React Version of the [Ionic Framework](https://ionicframework.com/docs)
_Zustand_ - Global State Manager [Zustand](https://github.com/pmndrs/zustand)
_Axios_ - [HTTP client for node.js](https://axios-http.com/docs/intro)

### Backend

The backend uses [Express.js](https://expressjs.com/) as server for hosting a REST API, which is all set up inside the `src/index.js`.
Backend also uses several other library:

- [Mongoose](https://expressjs.com/) as ODM for Mongo DB
- [cors](https://www.npmjs.com/package/cors) as enabler for CORS requests
- [morgan](https://www.npmjs.com/package/morgan) and [winston](https://www.npmjs.com/package/winston) for logging any activity that happens inside the backend service
- Check backend repo for documentation.
