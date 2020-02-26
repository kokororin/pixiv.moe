// eslint-disable-next-line spaced-comment
/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import '@babel/polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// Add support for all files in the test directory
const testsContext = require.context(
  '.',
  true,
  /(Test\.ts$)|(Helper\.ts$)|(!mocha\.ts)/
);
testsContext.keys().forEach(testsContext);
