/**
 * Quick dependency test runner (Node.js compatible)
 * Tests all Task 2 dependencies without requiring full Jest setup
 */

console.log('🧪 Testing Core Dependencies (Task 2)...\n');

let allPassed = true;

function testDep(name, testFn, description) {
  try {
    testFn();
    console.log(`✅ ${description}`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} - ${error.message}`);
    return false;
  }
}

// Test Framer Motion
allPassed &= testDep('framer-motion', () => {
  const { motion } = require('framer-motion');
  if (!motion) throw new Error('motion component not available');
}, 'Framer Motion - motion component');

// Test GSAP
allPassed &= testDep('gsap', () => {
  const { gsap } = require('gsap');
  if (!gsap) throw new Error('gsap not available');
}, 'GSAP - core library');

// Test GSAP ScrollTrigger
allPassed &= testDep('gsap/ScrollTrigger', () => {
  const { ScrollTrigger } = require('gsap/ScrollTrigger');
  if (!ScrollTrigger) throw new Error('ScrollTrigger not available');
}, 'GSAP ScrollTrigger - plugin');

// Test Lenis
allPassed &= testDep('@studio-freight/lenis', () => {
  const Lenis = require('@studio-freight/lenis');
  if (!Lenis) throw new Error('Lenis not available');
}, 'Lenis - smooth scroll library');

// Test fast-check
allPassed &= testDep('fast-check', () => {
  const fc = require('fast-check');
  if (!fc || !fc.integer) throw new Error('fast-check generators not available');
}, 'fast-check - property testing');

// Test React Testing Library
allPassed &= testDep('@testing-library/react', () => {
  const { render } = require('@testing-library/react');
  if (!render) throw new Error('render function not available');
}, 'React Testing Library - render function');

// Test Jest DOM
allPassed &= testDep('@testing-library/jest-dom', () => {
  require('@testing-library/jest-dom');
}, 'Jest DOM - custom matchers');

// Test our configuration files
allPassed &= testDep('animations', () => {
  const { fadeInUp, scaleOnHover } = require('./src/lib/animations');
  if (!fadeInUp || !scaleOnHover) throw new Error('animation variants not available');
}, 'Animation Configuration - Framer Motion variants');

allPassed &= testDep('smooth-scroll', () => {
  const { initSmoothScroll } = require('./src/lib/smooth-scroll');
  if (!initSmoothScroll) throw new Error('smooth scroll init function not available');
}, 'Smooth Scroll Configuration - Lenis setup');

allPassed &= testDep('gsap-config', () => {
  const { initGSAP } = require('./src/lib/gsap-config');
  if (!initGSAP) throw new Error('GSAP init function not available');
}, 'GSAP Configuration - setup functions');

allPassed &= testDep('test-utils', () => {
  const { buttonVariantArb, fc } = require('./src/lib/test-utils');
  if (!buttonVariantArb || !fc) throw new Error('test utilities not available');
}, 'Test Utilities - property generators');

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('🎉 All dependencies are working correctly!');
  console.log('✅ Task 2 completed successfully');
  console.log('\n💡 Next steps:');
  console.log('   • Run npm run dev to start development');
  console.log('   • Run npm test to run test suite');
  console.log('   • Proceed to Task 3: Design system setup');
} else {
  console.log('❌ Some dependencies have issues');
  console.log('🔧 Please resolve the issues above');
}
console.log('='.repeat(50));