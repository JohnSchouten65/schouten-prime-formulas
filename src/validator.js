// Test suite for validating Schouten's formulas against known mathematical results

import { SchoutenMath } from './main.js';
import { PrimeUtils } from './utils.js';

export class SchoutenValidator {
  
  static runAllTests() {
    console.log('🧮 Running Schouten Formula Validation Tests...\n');
    
    const results = {
      nextPrimeTests: this.testNextPrimeFunction(),
      gapLawTests: this.testGapLaw(),
      primeCountingTests: this.testPrimeCountingFunction(),
      primorialTests: this.testPrimorialCalculation(),
      spiralTests: this.testSpiralFormula(),
      performanceTests: this.testPerformance()
    };
    
    this.printResults(results);
    return results;
  }
  
  static testNextPrimeFunction() {
    console.log('Testing Next Prime Function...');
    const tests = [
      { input: 2, expected: 3 },
      { input: 10, expected: 11 },
      { input: 13, expected: 17 },
      { input: 100, expected: 101 },
      { input: 997, expected: 1009 }
    ];
    
    const results = tests.map(test => {
      const actual = SchoutenMath.nextPrime(test.input);
      const passed = actual === test.expected;
      
      if (!passed) {
        console.log(`❌ next_prime(${test.input}): expected ${test.expected}, got ${actual}`);
      } else {
        console.log(`✅ next_prime(${test.input}) = ${actual}`);
      }
      
      return { ...test, actual, passed };
    });
    
    return results;
  }
  
  static testGapLaw() {
    console.log('\nTesting Gap Law...');
    const knownGaps = [
      { prime: 2, nextPrime: 3, expectedGap: 1 },
      { prime: 3, nextPrime: 5, expectedGap: 2 },
      { prime: 7, nextPrime: 11, expectedGap: 4 },
      { prime: 23, nextPrime: 29, expectedGap: 6 },
      { prime: 89, nextPrime: 97, expectedGap: 8 }
    ];
    
    const results = knownGaps.map(test => {
      const actualGap = SchoutenMath.calculateGap(test.prime);
      const passed = actualGap === test.expectedGap;
      
      if (!passed) {
        console.log(`❌ gap(${test.prime}): expected ${test.expectedGap}, got ${actualGap}`);
      } else {
        console.log(`✅ gap(${test.prime}) = ${actualGap}`);
      }
      
      return { ...test, actualGap, passed };
    });
    
    return results;
  }
  
  static testPrimeCountingFunction() {
    console.log('\nTesting Prime Counting Function π(k)...');
    const knownCounts = [
      { k: 10, expected: 4 },  // primes: 2, 3, 5, 7
      { k: 20, expected: 8 },  // primes: 2, 3, 5, 7, 11, 13, 17, 19
      { k: 50, expected: 15 },
      { k: 100, expected: 25 },
      { k: 200, expected: 46 }
    ];
    
    const results = knownCounts.map(test => {
      const actual = SchoutenMath.primeCountingFunction(test.k);
      const passed = actual === test.expected;
      
      if (!passed) {
        console.log(`❌ π(${test.k}): expected ${test.expected}, got ${actual}`);
      } else {
        console.log(`✅ π(${test.k}) = ${actual}`);
      }
      
      return { ...test, actual, passed };
    });
    
    return results;
  }
  
  static testPrimorialCalculation() {
    console.log('\nTesting Primorial Calculation...');
    const tests = [
      { prime: 2, expected: 2n },
      { prime: 3, expected: 6n },    // 2 * 3
      { prime: 5, expected: 30n },   // 2 * 3 * 5
      { prime: 7, expected: 210n },  // 2 * 3 * 5 * 7
      { prime: 11, expected: 2310n } // 2 * 3 * 5 * 7 * 11
    ];
    
    const results = tests.map(test => {
      try {
        const actual = SchoutenMath.primorial(test.prime);
        const passed = actual === test.expected;
        
        if (!passed) {
          console.log(`❌ ${test.prime}#: expected ${test.expected}, got ${actual}`);
        } else {
          console.log(`✅ ${test.prime}# = ${actual}`);
        }
        
        return { ...test, actual, passed };
      } catch (error) {
        console.log(`❌ ${test.prime}#: error - ${error.message}`);
        return { ...test, actual: null, passed: false, error: error.message };
      }
    });
    
    return results;
  }
  
  static testSpiralFormula() {
    console.log('\nTesting Spiral Formula...');
    const tests = [1, 2, 3, 5, 10];
    
    const results = tests.map(n => {
      try {
        const point = SchoutenMath.spiralPoint(n);
        const prime = SchoutenMath.nthPrime(n);
        
        // Validate that the point contains expected properties
        const hasValidStructure = (
          typeof point.x === 'number' &&
          typeof point.y === 'number' &&
          typeof point.z === 'number' &&
          point.prime === prime &&
          !isNaN(point.x) &&
          !isNaN(point.y)
        );
        
        console.log(`✅ Spiral point ${n}: (${point.x.toFixed(3)}, ${point.y.toFixed(3)}, ${point.z}), prime = ${point.prime}`);
        
        return { n, point, passed: hasValidStructure };
      } catch (error) {
        console.log(`❌ Spiral point ${n}: error - ${error.message}`);
        return { n, passed: false, error: error.message };
      }
    });
    
    return results;
  }
  
  static testPerformance() {
    console.log('\nTesting Performance...');
    const tests = [
      { name: 'Next Prime (k=1000)', test: () => SchoutenMath.nextPrime(1000) },
      { name: 'Prime Counting (k=1000)', test: () => SchoutenMath.primeCountingFunction(1000) },
      { name: 'Find 100th Prime', test: () => SchoutenMath.nthPrime(100) },
      { name: 'Calculate Primorial 13#', test: () => SchoutenMath.primorial(13) },
      { name: 'Spiral Points (n=50)', test: () => {
        const points = [];
        for (let i = 1; i <= 50; i++) {
          points.push(SchoutenMath.spiralPoint(i));
        }
        return points.length;
      }}
    ];
    
    const results = tests.map(test => {
      const startTime = performance.now();
      let result;
      let error = null;
      
      try {
        result = test.test();
      } catch (e) {
        error = e.message;
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`⏱️  ${test.name}: ${duration.toFixed(2)}ms`);
      
      return {
        name: test.name,
        duration,
        result,
        error,
        passed: error === null && duration < 1000 // Consider it passed if under 1 second
      };
    });
    
    return results;
  }
  
  static printResults(results) {
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    
    Object.entries(results).forEach(([category, tests]) => {
      const passed = tests.filter(t => t.passed).length;
      const total = tests.length;
      const percentage = ((passed / total) * 100).toFixed(1);
      
      console.log(`${category}: ${passed}/${total} (${percentage}%) ✅`);
    });
    
    // Overall statistics
    const allTests = Object.values(results).flat();
    const totalPassed = allTests.filter(t => t.passed).length;
    const totalTests = allTests.length;
    const overallPercentage = ((totalPassed / totalTests) * 100).toFixed(1);
    
    console.log(`\n🎯 Overall: ${totalPassed}/${totalTests} (${overallPercentage}%) tests passed`);
    
    if (overallPercentage >= 90) {
      console.log('🎉 Excellent! Schouten formulas are working correctly.');
    } else if (overallPercentage >= 75) {
      console.log('⚠️  Good, but some formulas need attention.');
    } else {
      console.log('❌ Multiple formulas have issues and need debugging.');
    }
  }
  
  // Cross-validation with known mathematical libraries or references
  static crossValidateWithReferences() {
    console.log('\n🔬 Cross-validation with mathematical references...');
    
    // Known first 25 primes for validation
    const knownPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    
    // Test first 25 primes
    for (let n = 1; n <= 25; n++) {
      const calculated = SchoutenMath.nthPrime(n);
      const reference = knownPrimes[n - 1];
      
      if (calculated !== reference) {
        console.log(`❌ ${n}th prime: calculated ${calculated}, reference ${reference}`);
        return false;
      }
    }
    
    console.log('✅ All first 25 primes match mathematical references');
    return true;
  }
}

// Export for use in browser console during development
if (typeof window !== 'undefined') {
  window.SchoutenValidator = SchoutenValidator;
}
