# Schouten Prime Formulas Calculator

A modern web application for testing and visualizing **Schouten's deterministic formulas** for prime number calculations. This interactive calculator implements advanced mathematical algorithms for deterministic prime generation and provides stunning 3D visualizations.

## 🔬 Mathematical Features

### A. Deterministic Prime Generation (Schouten's Law)
- **Next Prime Function**: `next_prime(k) = k + d_n(k)`
- **Deterministic Gap Law**: `d_n = p_{n+1} - p_n = 1 + C(p_n)`
- Generate primes without traditional primality testing

### B. Prime Counting & Inverse Functions
- **Prime Counting Function**: `π(k) = k - 1 - C(k)`
- **Inverse Prime Counting**: Find the nth prime directly
- Exact prime counts without sieves

### C. Primorial & Modular Filtering
- **Primorial Calculation**: `p# = ∏p_i`
- **Survivor Criterion**: Advanced prime filtering using modular arithmetic
- Efficient prime candidate selection

### D. Conical Prime Spiral (3D Visualization)
- **3D Geometric Representation**: `P⃗(n) = (log p_n cos θ_n, log p_n sin θ_n, n)`
- **Interactive Visualization**: Real-time 3D spiral using Three.js
- **Mathematical Beauty**: All primes lie on the edge of a logarithmic cone

## 🚀 Technology Stack

- **Vite**: Fast development and build tool
- **Vanilla JavaScript**: Pure JS for optimal performance
- **Three.js**: 3D visualization engine
- **KaTeX**: Mathematical notation rendering
- **Modern CSS**: Responsive design with CSS Grid and Flexbox

## 🖥️ Features

- **Interactive Calculators**: Test all Schouten formulas with real-time results
- **3D Prime Spiral**: Stunning visualization of the Conical Prime Spiral
- **Mathematical Notation**: Proper LaTeX rendering for all formulas
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Computation**: Instant calculations and visualizations
- **Error Handling**: Comprehensive validation and error messages

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sitoweb-prime
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📱 Usage

### Deterministic Formulas Tab
- Enter a number `k` to find the next prime using Schouten's deterministic method
- Calculate gaps between consecutive primes using the deterministic gap law
- Compare results with traditional prime finding methods

### Prime Counting Tab
- Count primes up to any number `k` using `π(k) = k - 1 - C(k)`
- Find the nth prime directly without generating all previous primes
- Validate results against known prime sequences

### 3D Spiral Visualization Tab
- Generate interactive 3D visualizations of the Conical Prime Spiral
- Adjust the number of primes to visualize (10-200)
- Click to pause/resume rotation
- Each point represents a prime number in 3D logarithmic coordinates

### Modular Filter Tab
- Calculate primorials for efficient prime filtering
- Test the survivor criterion for prime candidates
- Explore advanced modular arithmetic properties

## 🧮 Mathematical Accuracy

All implementations strictly follow the exact Schouten formulas:

- **Formula Validation**: Results validated against known prime sequences
- **Edge Case Handling**: Proper handling of boundary conditions
- **BigInt Support**: Large number calculations for primorials
- **Error Boundaries**: Comprehensive input validation

## 🎨 Design Philosophy

- **Mathematical Clarity**: Clean, readable formulas and results
- **Interactive Learning**: Hands-on exploration of prime number theory
- **Visual Beauty**: Stunning 3D representations of mathematical concepts
- **Performance**: Optimized algorithms for real-time calculations

## 📊 Performance Notes

- Calculations are performed in real-time for numbers up to ~10,000
- 3D visualizations support up to 200 primes smoothly
- Primorial calculations use BigInt for arbitrary precision
- Responsive design ensures smooth performance on all devices

## 🔬 Research Applications

This tool is valuable for:
- **Prime Number Research**: Testing and validating Schouten's deterministic approaches
- **Mathematical Education**: Visual exploration of prime number patterns
- **Algorithm Development**: Comparing deterministic vs. probabilistic prime methods
- **Pattern Recognition**: Discovering new relationships in prime distributions

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Mathematical accuracy in all implementations
- Proper testing of new features
- Documentation of any formula modifications
- Responsive design compliance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Based on the mathematical work of Schouten's deterministic prime formulas
- Built with modern web technologies for maximum accessibility
- Inspired by the beauty of mathematical visualization

---

**Live Demo**: [Launch Application](http://localhost:5173)

**Author**: Prime Mathematics Research Team  
**Version**: 1.0.0  
**Last Updated**: August 2025
