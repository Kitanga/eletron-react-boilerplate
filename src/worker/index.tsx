import { render } from 'react-dom';
import { ipcRenderer } from 'electron';
import App from './App';
import { doWork } from '../helpers/work';

console.log('worker working');
ipcRenderer.on('renderer', (event, data) => {
  const [port] = event.ports;
  console.log(data);
  port.onmessage = async (evt) => {
    console.log(evt.data);
    // The event data can be any serializable object (and the event could even
    // carry other MessagePorts with it!)
    const result = await doWork(evt.data);
    port.postMessage(result);
  };
});

console.log('kkkkk');

render(<App />, document.getElementById('root'));
