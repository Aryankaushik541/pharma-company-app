const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('='.repeat(60));
console.log('🏥 PHARMA COMPANY APP - AUTO STARTER');
console.log('='.repeat(60));

// Check if backend dependencies are installed
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
if (!fs.existsSync(backendNodeModules)) {
  console.log('📦 Installing backend dependencies...');
  const backendInstall = spawn('npm', ['install'], {
    cwd: path.join(__dirname, 'backend'),
    shell: true,
    stdio: 'inherit'
  });
  
  backendInstall.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Backend dependencies installed');
      startServers();
    } else {
      console.error('❌ Failed to install backend dependencies');
      process.exit(1);
    }
  });
} else {
  startServers();
}

function startServers() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Starting Backend Server...');
  console.log('='.repeat(60));
  
  // Start backend server
  const backend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    shell: true,
    stdio: 'inherit'
  });
  
  backend.on('error', (error) => {
    console.error('❌ Backend Error:', error);
  });
  
  // Wait 3 seconds for backend to start, then start frontend
  setTimeout(() => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 Starting Frontend (Expo)...');
    console.log('='.repeat(60));
    
    const frontend = spawn('npm', ['start'], {
      cwd: __dirname,
      shell: true,
      stdio: 'inherit'
    });
    
    frontend.on('error', (error) => {
      console.error('❌ Frontend Error:', error);
    });
  }, 3000);
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n\n' + '='.repeat(60));
    console.log('🛑 Shutting down servers...');
    console.log('='.repeat(60));
    backend.kill();
    process.exit();
  });
}

console.log('\n💡 Tips:');
console.log('   - Backend will run on http://localhost:3000');
console.log('   - Frontend will open Expo DevTools');
console.log('   - Press Ctrl+C to stop both servers');
console.log('='.repeat(60) + '\n');