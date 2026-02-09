const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('='.repeat(60));
console.log('🏥 PHARMA COMPANY APP - AUTO STARTER');
console.log('='.repeat(60));

// Function to kill process on port 3000
function killPort3000(callback) {
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    // Windows command to find and kill process on port 3000
    exec('netstat -ano | findstr :3000', (error, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        const pids = new Set();
        
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(pid)) {
            pids.add(pid);
          }
        });
        
        if (pids.size > 0) {
          console.log('⚠️  Port 3000 is already in use. Killing existing process...');
          pids.forEach(pid => {
            exec(`taskkill /PID ${pid} /F`, (err) => {
              if (!err) {
                console.log(`✅ Killed process ${pid}`);
              }
            });
          });
          
          // Wait a bit for processes to be killed
          setTimeout(callback, 2000);
        } else {
          callback();
        }
      } else {
        callback();
      }
    });
  } else {
    // Mac/Linux command
    exec('lsof -ti:3000', (error, stdout) => {
      if (stdout) {
        const pid = stdout.trim();
        console.log('⚠️  Port 3000 is already in use. Killing existing process...');
        exec(`kill -9 ${pid}`, (err) => {
          if (!err) {
            console.log(`✅ Killed process ${pid}`);
          }
          setTimeout(callback, 2000);
        });
      } else {
        callback();
      }
    });
  }
}

// Check if backend dependencies are installed
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');

function installBackendDeps(callback) {
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
        callback();
      } else {
        console.error('❌ Failed to install backend dependencies');
        process.exit(1);
      }
    });
  } else {
    callback();
  }
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
  
  backend.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`❌ Backend exited with code ${code}`);
    }
  });
  
  // Wait 3 seconds for backend to start, then start frontend
  setTimeout(() => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 Starting Frontend (Expo)...');
    console.log('='.repeat(60));
    
    const frontend = spawn('npx', ['expo', 'start'], {
      cwd: __dirname,
      shell: true,
      stdio: 'inherit'
    });
    
    frontend.on('error', (error) => {
      console.error('❌ Frontend Error:', error);
    });
    
    frontend.on('close', (code) => {
      if (code !== 0 && code !== null) {
        console.error(`❌ Frontend exited with code ${code}`);
      }
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
  
  process.on('SIGTERM', () => {
    backend.kill();
    process.exit();
  });
}

console.log('\n💡 Tips:');
console.log('   - Backend will run on http://localhost:3000');
console.log('   - Frontend will open Expo DevTools');
console.log('   - Press Ctrl+C to stop both servers');
console.log('='.repeat(60) + '\n');

// Start the process
killPort3000(() => {
  installBackendDeps(() => {
    startServers();
  });
});