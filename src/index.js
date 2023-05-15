const odbc = require('odbc');

// looks like this:
// 'DSN=******;Driver=IBM i Access ODBC Driver;Password=*****;UserID=GUENEY;CCSID=1208'
const { connectionString } = require('./config.json');

async function connectToDatabase() {
  console.time('Connecting to IBM i');
  const connection1 = await odbc.connect(connectionString);
  console.timeEnd('Connecting to IBM i');

  console.time('Query QSYS2.ACTIVE_JOB_INFO');
  await connection1.query(
    `select * from TABLE(QSYS2.ACTIVE_JOB_INFO(DETAILED_INFO=>'ALL')) X WHERE JOB_TYPE<>'SYS' LIMIT 100`
  );
  console.timeEnd('Query QSYS2.ACTIVE_JOB_INFO');

  await connection1.close();
}

connectToDatabase();
