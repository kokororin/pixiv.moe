import 'babel-polyfill';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// Add support for all files in the test directory
const testsContext = require.context(
  '.',
  true,
  /(Test\.js$)|(Helper\.js$)|(!mocha\.js)/
);
testsContext.keys().forEach(testsContext);
