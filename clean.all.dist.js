const fs = require('fs');
const path = require('path');

function cleanDistFolders() {
  const root = __dirname;

  // clean root dist
  const rootDist = path.join(root, 'dist');
  if (fs.existsSync(rootDist)) {
    fs.rmSync(rootDist, {recursive: true, force: true});
  }

  // clean all subdirectories dist
  fs.readdirSync(root, {withFileTypes: true})
    .filter(dir => dir.isDirectory() && dir.name !== 'node_modules')
    .forEach(dir => {
      const distPath = path.join(root, dir.name, 'dist');
      if (fs.existsSync(distPath)) {
        fs.rmSync(distPath, {recursive: true, force: true});
      }
    });
}

cleanDistFolders();