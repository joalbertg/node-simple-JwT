const app = require('./app');

const init = async () => {
  await app.listen(3000);
  console.log('Server on port 3000')
} 

init();
