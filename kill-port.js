const { exec } = require('child_process');

console.log('🔍 Checking port 3000...');

const isWindows = process.platform === 'win32';

if (isWindows) {
  // Windows
  exec('netstat -ano | findstr :3000', (error, stdout) => {
    if (stdout) {
      console.log('⚠️  Port 3000 is in use. Killing process...\n');
      
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
        pids.forEach(pid => {
          exec(`taskkill /PID ${pid} /F`, (err, stdout) => {
            if (!err) {
              console.log(`✅ Killed process ${pid}`);
            } else {
              console.log(`❌ Failed to kill process ${pid}`);
            }
          });
        });
        
        setTimeout(() => {
          console.log('\n✅ Port 3000 is now free!');
          console.log('💡 You can now run: npm start');
        }, 1000);
      }
    } else {
      console.log('✅ Port 3000 is already free!');
    }
  });
} else {
  // Mac/Linux
  exec('lsof -ti:3000', (error, stdout) => {
    if (stdout) {
      const pid = stdout.trim();
      console.log(`⚠️  Port 3000 is in use by process ${pid}. Killing...\n`);
      
      exec(`kill -9 ${pid}`, (err) => {
        if (!err) {
          console.log(`✅ Killed process ${pid}`);
          console.log('\n✅ Port 3000 is now free!');
          console.log('💡 You can now run: npm start');
        } else {
          console.log(`❌ Failed to kill process ${pid}`);
        }
      });
    } else {
      console.log('✅ Port 3000 is already free!');
    }
  });
}