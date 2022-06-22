const { contextBridge, ipcRenderer } = require('electron');
// const testmgr = require('../models/testmgr');

// const getNames = () => {
//   return testmgr.getNames();
// };

contextBridge.exposeInMainWorld('main', {
  // getNames: getNames,
  ipcRenderer: {
    work(data) {
      // we init the ports
      ipcRenderer.send('init_worker_renderer_channel', data);

      ipcRenderer.once('worker', (event, data) => {
        // Once we receive the reply, we can take the port...
        const [port] = event.ports;
        // ... register a handler to receive results ...
        port.onmessage = (event) => {
          console.log('received result:', event.data);
        };
        // ... and start sending it work!
        port.postMessage(data);
      });
    },

    send_channel(port, data) {
      port.postMessage(data);
    },

    send(channel, data) {
      ipcRenderer.send(channel, { ...data });
    },
    on(channel, func) {
      const validChannels = ['worker'];
      if (validChannels.includes(channel)) {
        if (channel === 'worker') {
        } else {
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
        // Deliberately strip event as it includes `sender`
      }
    },
    once(channel, func) {
      const validChannels = ['worker'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});

// myPing() {
//   ipcRenderer.send('ipc-example', 'ping');
// },
