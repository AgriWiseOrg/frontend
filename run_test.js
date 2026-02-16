// Quick script to run test and capture output
const { execSync } = require('child_process');

try {
    const output = execSync('npm test -- MarketPrices.test.jsx --no-coverage', {
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: __dirname
    });
    console.log(output);
} catch (error) {
    console.log('STDOUT:', error.stdout);
    console.log('STDERR:', error.stderr);
}
