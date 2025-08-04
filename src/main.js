import './style.css'
import * as THREE from 'three'

// Mathematical utility functions for Schouten's formulas
class SchoutenMath {
  
  // Check if a number is prime (traditional method for validation)
  static isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  // Generate first n primes (for comparison and validation)
  static generatePrimes(n) {
    const primes = [];
    let candidate = 2;
    
    while (primes.length < n) {
      if (this.isPrime(candidate)) {
        primes.push(candidate);
      }
      candidate++;
    }
    return primes;
  }

  // Count composite numbers up to k
  static countComposites(k) {
    if (k < 4) return 0;
    let composites = 0;
    for (let i = 4; i <= k; i++) {
      if (!this.isPrime(i)) {
        composites++;
      }
    }
    return composites;
  }

  // A. Deterministic Formulas (Schouten's Law)
  
  // Next Prime Function: next_prime(k) = k + d_n(k)
  static nextPrime(k) {
    let candidate = k + 1;
    while (!this.isPrime(candidate)) {
      candidate++;
    }
    return candidate;
  }

  // Gap calculation: d_n = p_{n+1} - p_n = 1 + C(p_n)
  static calculateGap(prime) {
    if (!this.isPrime(prime)) {
      throw new Error('Input must be a prime number');
    }
    const nextP = this.nextPrime(prime);
    return nextP - prime;
  }

  // B. Prime Counting Functions
  
  // Prime counting function: π(k) = k - 1 - C(k)
  static primeCountingFunction(k) {
    if (k < 2) return 0;
    const composites = this.countComposites(k);
    return k - 1 - composites;
  }

  // Inverse prime counting: find nth prime
  static nthPrime(n) {
    if (n < 1) throw new Error('n must be positive');
    const primes = this.generatePrimes(n);
    return primes[n - 1];
  }

  // C. Primorial and Modular Filtering
  
  // Primorial: p# = ∏(i=1 to n) p_i
  static primorial(prime) {
    if (!this.isPrime(prime)) {
      throw new Error('Input must be a prime number');
    }
    
    let result = 1n; // Use BigInt for large numbers
    let p = 2;
    
    while (p <= prime) {
      if (this.isPrime(p)) {
        result *= BigInt(p);
      }
      p++;
    }
    return result;
  }

  // Greatest Common Divisor
  static gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  // Survivor criterion: k mod p# ∈ R (coprime residues)
  static survivorCriterion(k, prime) {
    const primorial = this.primorial(prime);
    const remainder = BigInt(k) % primorial;
    return this.gcd(Number(remainder), Number(primorial)) === 1;
  }

  // D. Conical Prime Spiral
  
  // Calculate theta_n for spiral: θ_n = arctan(n / log(p_n))
  static calculateTheta(n, prime) {
    return Math.atan(n / Math.log(prime));
  }

  // Spiral point calculation: P⃗(n) = (log(p_n)cos(θ_n), log(p_n)sin(θ_n), n)
  static spiralPoint(n) {
    const prime = this.nthPrime(n);
    const logPrime = Math.log(prime);
    const theta = this.calculateTheta(n, prime);
    
    return {
      x: logPrime * Math.cos(theta),
      y: logPrime * Math.sin(theta),
      z: n,
      prime: prime
    };
  }
}

// UI Controller Class
class SchoutenUI {
  constructor() {
    this.initializeTabs();
    this.initializeCalculators();
    this.initializeFormulas();
  }

  initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        const targetPanel = document.getElementById(tab.dataset.tab);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  initializeCalculators() {
    // Add Enter key support for all input fields
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const button = input.parentElement.querySelector('button');
          if (button) button.click();
        }
      });
    });

    // Next Prime Calculator
    document.getElementById('next-prime-calc').addEventListener('click', () => {
      const k = parseInt(document.getElementById('next-prime-input').value);
      const result = document.getElementById('next-prime-result');
      
      try {
        const nextPrime = SchoutenMath.nextPrime(k);
        const gap = nextPrime - k;
        result.className = 'result success';
        result.textContent = `next_prime(${k}) = ${nextPrime} (gap: ${gap})`;
      } catch (error) {
        result.className = 'result error';
        result.textContent = `Error: ${error.message}`;
      }
    });

    // Gap Calculator
    document.getElementById('gap-calc').addEventListener('click', () => {
      const prime = parseInt(document.getElementById('gap-input').value);
      const result = document.getElementById('gap-result');
      
      try {
        const gap = SchoutenMath.calculateGap(prime);
        const composites = gap - 1;
        result.className = 'result success';
        result.textContent = `d_n = ${gap}, C(${prime}) = ${composites}`;
      } catch (error) {
        result.className = 'result error';
        result.textContent = `Error: ${error.message}`;
      }
    });

    // Prime Counting Calculator
    document.getElementById('counting-calc').addEventListener('click', () => {
      const k = parseInt(document.getElementById('counting-input').value);
      const result = document.getElementById('counting-result');
      
      try {
        const count = SchoutenMath.primeCountingFunction(k);
        const composites = SchoutenMath.countComposites(k);
        result.className = 'result success';
        result.textContent = `π(${k}) = ${count}, C(${k}) = ${composites}`;
      } catch (error) {
        result.className = 'result error';
        result.textContent = `Error: ${error.message}`;
      }
    });

    // Inverse Prime Counting Calculator
    document.getElementById('inverse-calc').addEventListener('click', () => {
      const n = parseInt(document.getElementById('inverse-input').value);
      const result = document.getElementById('inverse-result');
      
      try {
        const prime = SchoutenMath.nthPrime(n);
        result.className = 'result success';
        result.textContent = `p_${n} = ${prime}`;
      } catch (error) {
        result.className = 'result error';
        result.textContent = `Error: ${error.message}`;
      }
    });

    // Primorial Calculator
    document.getElementById('primorial-calc').addEventListener('click', () => {
      const prime = parseInt(document.getElementById('primorial-input').value);
      const result = document.getElementById('primorial-result');
      
      try {
        const primorial = SchoutenMath.primorial(prime);
        result.className = 'result success';
        result.textContent = `${prime}# = ${primorial.toString()}`;
      } catch (error) {
        result.className = 'result error';
        result.textContent = `Error: ${error.message}`;
      }
    });

    // Survivor Criterion Calculator
    document.getElementById('survivor-calc').addEventListener('click', () => {
      const k = parseInt(document.getElementById('survivor-input').value);
      const prime = parseInt(document.getElementById('survivor-prime').value);
      const result = document.getElementById('survivor-result');
      
      try {
        const isSurvivor = SchoutenMath.survivorCriterion(k, prime);
        result.className = 'result success';
        result.textContent = `${k} ${isSurvivor ? 'passes' : 'fails'} survivor criterion for ${prime}#`;
      } catch (error) {
        result.className = 'result error';
        result.textContent = `Error: ${error.message}`;
      }
    });

    // 3D Spiral Controls
    const spiralRange = document.getElementById('spiral-range');
    const spiralCount = document.getElementById('spiral-count');
    
    spiralRange.addEventListener('input', () => {
      spiralCount.textContent = spiralRange.value;
    });

    document.getElementById('spiral-generate').addEventListener('click', () => {
      const count = parseInt(spiralRange.value);
      this.generateSpiral(count);
    });
  }

  initializeFormulas() {
    // Render mathematical formulas using KaTeX
    const formulas = {
      'next-prime-formula': 'next\\_prime(k) = k + d_n(k), \\quad d_n(k) = \\min\\{m \\in \\mathbb{N} \\mid k+m \\in \\mathbb{P}\\}',
      'gap-law-formula': 'd_n = p_{n+1} - p_n = 1 + C(p_n)',
      'counting-formula': '\\pi(k) = k - 1 - C(k)',
      'inverse-formula': 'p_n = \\pi^{-1}(n)',
      'primorial-formula': 'p\\# = \\prod_{i=1}^{n} p_i',
      'survivor-formula': 'k \\bmod p\\# \\in R',
      'spiral-formula': '\\vec{P}(n) = (\\log p_n \\cos \\theta_n, \\log p_n \\sin \\theta_n, n), \\quad \\theta_n = \\arctan\\frac{n}{\\log p_n}'
    };

    Object.entries(formulas).forEach(([id, formula]) => {
      const element = document.getElementById(id);
      if (element && window.katex) {
        katex.render(formula, element, {
          displayMode: true,
          throwOnError: false
        });
      }
    });
  }

  generateSpiral(count) {
    const container = document.getElementById('spiral-container');
    
    // Clear previous visualization
    container.innerHTML = '';

    // Create Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000011);
    container.appendChild(renderer.domElement);

    // Generate spiral points
    const points = [];
    const colors = [];
    
    for (let n = 1; n <= count; n++) {
      const point = SchoutenMath.spiralPoint(n);
      points.push(new THREE.Vector3(point.x, point.y, point.z));
      
      // Color based on prime size
      const hue = (point.prime % 360) / 360;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors.push(color.r, color.g, color.b);
    }

    // Create geometry
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Create materials
    const pointMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.3
    });

    // Create mesh objects
    const pointCloud = new THREE.Points(geometry, pointMaterial);
    const line = new THREE.Line(geometry, lineMaterial);

    scene.add(pointCloud);
    scene.add(line);

    // Add coordinate axes
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Position camera
    camera.position.set(10, 10, 15);
    camera.lookAt(0, 0, count / 2);

    // Add orbit controls (simplified rotation)
    let isRotating = true;
    function animate() {
      requestAnimationFrame(animate);
      
      if (isRotating) {
        pointCloud.rotation.z += 0.005;
        line.rotation.z += 0.005;
      }
      
      renderer.render(scene, camera);
    }

    // Toggle rotation on click
    container.addEventListener('click', () => {
      isRotating = !isRotating;
    });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    animate();
  }

  runDemoCalculations() {
    // Demo for next prime
    const nextPrimeInput = document.getElementById('next-prime-input');
    const nextPrimeResult = document.getElementById('next-prime-result');
    if (nextPrimeInput && nextPrimeResult) {
      const k = 10;
      const nextPrime = SchoutenMath.nextPrime(k);
      const gap = nextPrime - k;
      nextPrimeResult.className = 'result info';
      nextPrimeResult.textContent = `Demo: next_prime(${k}) = ${nextPrime} (gap: ${gap})`;
    }
    
    // Demo for prime counting
    const countingResult = document.getElementById('counting-result');
    if (countingResult) {
      const k = 100;
      const count = SchoutenMath.primeCountingFunction(k);
      const composites = SchoutenMath.countComposites(k);
      countingResult.className = 'result info';
      countingResult.textContent = `Demo: π(${k}) = ${count}, C(${k}) = ${composites}`;
    }
    
    // Demo for spiral (generate a small spiral by default)
    setTimeout(() => {
      this.generateSpiral(25);
    }, 2000);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const ui = new SchoutenUI();
  
  // Show some demo calculations when page loads
  setTimeout(() => {
    ui.runDemoCalculations();
  }, 1000);
});
