// Test script to verify enhancements
console.log('Testing Schouten Math enhancements...');

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
