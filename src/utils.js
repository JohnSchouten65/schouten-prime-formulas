// Additional mathematical utilities and optimizations for Schouten formulas

export class PrimeUtils {
  
  // Memoization cache for computed primes
  static primeCache = new Map();
  static compositeCache = new Map();
  
  // Sieve of Eratosthenes for efficient prime generation up to n
  static sieveOfEratosthenes(n) {
    if (this.primeCache.has(n)) {
      return this.primeCache.get(n);
    }
    
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= n; j += i) {
          isPrime[j] = false;
        }
      }
    }
    
    const primes = [];
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) primes.push(i);
    }
    
    this.primeCache.set(n, primes);
    return primes;
  }
  
  // Wilson's theorem: (p-1)! ≡ -1 (mod p) if and only if p is prime
  static wilsonTest(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    // For small numbers, use Wilson's theorem
    if (n < 100) {
      let factorial = 1n;
      for (let i = 1; i < n; i++) {
        factorial = (factorial * BigInt(i)) % BigInt(n);
      }
      return factorial === BigInt(n - 1);
    }
    
    // For larger numbers, fall back to trial division
    return this.isPrimeTrial(n);
  }
  
  // Trial division primality test
  static isPrimeTrial(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  // Optimized prime counting using segmented sieve
  static primeCountingOptimized(n) {
    if (n < 2) return 0;
    if (n === 2) return 1;
    
    const primes = this.sieveOfEratosthenes(n);
    return primes.length;
  }
  
  // Calculate prime gaps efficiently
  static calculateAllGaps(upTo) {
    const primes = this.sieveOfEratosthenes(upTo);
    const gaps = [];
    
    for (let i = 0; i < primes.length - 1; i++) {
      gaps.push({
        prime: primes[i],
        nextPrime: primes[i + 1],
        gap: primes[i + 1] - primes[i]
      });
    }
    
    return gaps;
  }
  
  // Twin primes: pairs of primes (p, p+2)
  static findTwinPrimes(upTo) {
    const primes = this.sieveOfEratosthenes(upTo);
    const twins = [];
    
    for (let i = 0; i < primes.length - 1; i++) {
      if (primes[i + 1] - primes[i] === 2) {
        twins.push([primes[i], primes[i + 1]]);
      }
    }
    
    return twins;
  }
  
  // Cousin primes: pairs of primes (p, p+4)
  static findCousinPrimes(upTo) {
    const primes = this.sieveOfEratosthenes(upTo);
    const cousins = [];
    
    for (let i = 0; i < primes.length; i++) {
      const cousin = primes[i] + 4;
      if (cousin <= upTo && this.isPrimeTrial(cousin)) {
        cousins.push([primes[i], cousin]);
      }
    }
    
    return cousins;
  }
  
  // Sophie Germain primes: p where 2p+1 is also prime
  static findSophieGermainPrimes(upTo) {
    const primes = this.sieveOfEratosthenes(upTo);
    const sophieGermain = [];
    
    for (const p of primes) {
      if (2 * p + 1 <= upTo && this.isPrimeTrial(2 * p + 1)) {
        sophieGermain.push(p);
      }
    }
    
    return sophieGermain;
  }
  
  // Mersenne prime candidates: 2^p - 1 where p is prime
  static findMersenneCandidates(maxExponent) {
    const primeExponents = this.sieveOfEratosthenes(maxExponent);
    const candidates = [];
    
    for (const p of primeExponents) {
      if (p <= 31) { // Avoid overflow for larger exponents
        const mersenne = (2 ** p) - 1;
        candidates.push({
          exponent: p,
          value: mersenne,
          isPrime: this.isPrimeTrial(mersenne)
        });
      }
    }
    
    return candidates;
  }
  
  // Goldbach conjecture verification: every even n > 2 is sum of two primes
  static verifyGoldbach(n) {
    if (n % 2 !== 0 || n <= 2) return null;
    
    const primes = this.sieveOfEratosthenes(n);
    
    for (const p of primes) {
      const complement = n - p;
      if (complement >= p && this.isPrimeTrial(complement)) {
        return [p, complement];
      }
    }
    
    return null; // Goldbach conjecture failed (shouldn't happen for known numbers)
  }
  
  // Calculate prime density around n
  static primeDensity(n, window = 100) {
    const start = Math.max(2, n - window);
    const end = n + window;
    
    const primes = this.sieveOfEratosthenes(end).filter(p => p >= start);
    return primes.length / (2 * window);
  }
  
  // Format large numbers for display
  static formatNumber(n) {
    if (typeof n === 'bigint') {
      return n.toLocaleString();
    }
    return n.toLocaleString();
  }
  
  // Clear caches (useful for memory management)
  static clearCaches() {
    this.primeCache.clear();
    this.compositeCache.clear();
  }
}
