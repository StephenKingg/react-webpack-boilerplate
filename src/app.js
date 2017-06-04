// import react from 'react';

import './test.css';
// import './style.scss';

((con) => {
  ['yes', 'no'].forEach((item) => {
    con.log(item);
    con.error('err');
    con.info('info');
    con.debug('debug');
    con.assert('true');
  });
})(console);
