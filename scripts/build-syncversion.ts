const fs = require('fs-extra');

const reversion = async () => {
  const packageJson = fs.readJsonSync('./package.json');
  const electronPackageJson = fs.readJsonSync('./electron/package.json');

  electronPackageJson.version = packageJson.version;
  fs.writeJsonSync('./electron/package.json', electronPackageJson, {
    spaces: 2,
  });

  console.info('Updated Electron version!');
};

reversion();
