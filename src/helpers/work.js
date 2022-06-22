// const IndexedDatabase = require('./database');
// const Generator = require('./Generator');

// let database = new IndexedDatabase();

export const doWork = async (message) => {
  // Something cpu-intensive.
  let res;
  switch (message.type) {
    case 'start_generation':
      console.log('start generation');
      // we define and start the generator
      // globalThis.Window.generator = new Generator(message.data);
      // await globalThis.Window.generator.start();
      // res = message.data;
      break;
    default:
      null;
  }
  return res;
};
