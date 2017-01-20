import path from 'path';

import devConfig from './config/webpack.development';
import prodConfig from './config/webpack.production';

const PATHS = {
  rootPath: __dirname,
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const devOpt = {
  paths: PATHS
};

const prodOpt = {
  paths: PATHS,
  templateFilePath: path.join(__dirname, 'html/index.ejs'),
  jsCdn: '//localhost:3030/',
  cssCdn: '//localhost:3030/',
  useSourceMap: false,
  dropConsole: true
};

export default (env) => {

  switch(env) {

    case 'prod':
    case 'production': {
      const prod = prodConfig(prodOpt);
      // console.log(JSON.stringify(prod, null, 2));

      return prod;
    }

    case 'dev':
    case 'development': {
      const dev = devConfig(devOpt);
      // console.log(JSON.stringify(dev, null, 2));

      return dev;
    }

    default:
      throw 'no env is specified';
  }

};
