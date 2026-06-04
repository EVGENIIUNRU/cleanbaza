const { app, BrowserWindow, Menu, net, protocol, shell } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const APP_PROTOCOL = "cleanbaza";
const APP_HOST = "app";
const APP_ROOT = path.resolve(__dirname, "..");

protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_PROTOCOL,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

function resolveAppFile(requestUrl) {
  const url = new URL(requestUrl);
  if (url.hostname !== APP_HOST) return null;

  const requestedPath = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
  const filePath = path.normalize(path.join(APP_ROOT, requestedPath));
  const rootWithSeparator = `${APP_ROOT}${path.sep}`;

  if (filePath !== APP_ROOT && !filePath.startsWith(rootWithSeparator)) return null;
  return filePath;
}

function registerAppProtocol() {
  protocol.handle(APP_PROTOCOL, (request) => {
    const filePath = resolveAppFile(request.url);
    if (!filePath) return new Response("Not found", { status: 404 });
    return net.fetch(pathToFileURL(filePath).toString());
  });
}

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 1100,
    minHeight: 720,
    title: "BAZA Clean Ops",
    backgroundColor: "#f4f7fa",
    autoHideMenuBar: true,
    icon: path.join(APP_ROOT, "assets", "baza-app-icon.png"),
    webPreferences: {
      contextIsolation: true,
      devTools: !app.isPackaged,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  mainWindow.loadURL(`${APP_PROTOCOL}://${APP_HOST}/index.html`);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith(`${APP_PROTOCOL}://${APP_HOST}/`)) return;
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  registerAppProtocol();
  Menu.setApplicationMenu(null);
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
