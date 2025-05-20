/* eslint-disable @typescript-eslint/no-explicit-any */
const rec = require('recursive-readdir');
const fs = require('fs-extra');
const path = require('path');

fs.ensureDirSync('public/maps');
fs.ensureDirSync('public/json');

const copy = async () => {
  const files = await rec(`./gameassets/map-layout/`);

  const validFiles = files.filter((file: any) => {
    return !file.includes('Backgrounds') && !file.includes('MapNodes');
  });

  validFiles.forEach((file: any) => {
    fs.copySync(file, `public/maps/${path.basename(file)}`);
  });

  fs.writeJsonSync(
    'public/json/maps.json',
    validFiles.map((f: any) => path.basename(f, '.json')),
  );
};

copy();
