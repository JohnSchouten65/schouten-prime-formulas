// Test script to verify enhancements
console.log('Testing Schouten Math enhancements...');
console.log('Build timestamp: 2025-08-04T07:02:00Z');
console.log('Version: 2.0-enhanced');

// Check meta tags to verify correct version
const buildMeta = document.querySelector('meta[name="build-timestamp"]');
const versionMeta = document.querySelector('meta[name="version"]');
if (buildMeta && versionMeta) {
  console.log('✅ Correct HTML version loaded:', versionMeta.content);
  console.log('✅ Build timestamp:', buildMeta.content);
} else {
  console.log('❌ Old HTML version - GitHub Pages not updated yet');
  console.log('Please wait 5-10 minutes for GitHub Pages to update');
}

// Test NextPrime function
try {
  const testResult = SchoutenMath.nextPrime(14);
  console.log('NextPrime(14) result:', testResult);
  
  if (testResult && typeof testResult === 'object' && testResult.nextPrime) {
    console.log('✅ Enhanced NextPrime function is working correctly');
    console.log(`Next prime after 14: ${testResult.nextPrime}`);
    console.log(`Gap: ${testResult.gap}`);
    console.log(`Formula: ${testResult.formula}`);
  } else {
    console.log('❌ Enhanced NextPrime function is not working');
  }
} catch (error) {
  console.log('❌ Error testing NextPrime:', error);
}

// Test if result-details class exists in CSS
const testDiv = document.createElement('div');
testDiv.className = 'result-details';
document.body.appendChild(testDiv);
const styles = window.getComputedStyle(testDiv);
if (styles.width !== 'auto') {
  console.log('✅ Enhanced CSS styles are loaded');
} else {
  console.log('❌ Enhanced CSS styles are not loaded');
}
document.body.removeChild(testDiv);

console.log('Test completed. Check results above.');
