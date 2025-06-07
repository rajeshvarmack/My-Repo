const { spawn } = require('child_process');
const path = require('path');

// Force ignore Node.js version checks by setting environment variable
process.env.NG_DISABLE_VERSION_CHECK = '1';

// Path to the local Angular CLI
const ngPath = path.join(__dirname, 'node_modules', '.bin', 'ng.cmd');

// Spawn the ng serve command
const child = spawn(ngPath, ['serve'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NG_DISABLE_VERSION_CHECK: '1',
  },
});

child.on('error', error => {
  console.error('Error starting development server:', error);
});

child.on('close', code => {
  console.log(`Development server exited with code ${code}`);
});
