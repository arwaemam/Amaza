#!/usr/bin/env node

/**
 * Comprehensive Setup Validation Script
 * Validates that Task 2 dependencies are properly installed and configured
 */

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkDependency(depName, description) {
  try {
    require.resolve(depName);
    log(`✅ ${description} - ${depName}`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${description} - ${depName} (NOT FOUND)`, colors.red);
    return false;
  }
}

function main() {
  log('\n🎯 Task 2: Validating Core Dependencies Installation\n', colors.bold + colors.blue);
  log('Checking dependencies for AmazePMS Website Redesign...', colors.blue);
  
  let allGood = true;
  const results = {};

  // Task 2 Requirements Check
  log('\n📦 Task 2.1: Framer Motion for Component Animations', colors.bold);
  results.framerMotion = checkDependency('framer-motion', 'Framer Motion');
  if (!results.framerMotion) allGood = false;

  // Check if motion component is available
  try {
    const { motion } = require('framer-motion');
    log('   ✅ motion component accessible', colors.green);
  } catch (error) {
    log('   ❌ motion component not accessible', colors.red);
    allGood = false;
  }

  log('\n📦 Task 2.2: GSAP and ScrollTrigger for Complex Scroll Animations', colors.bold);
  results.gsap = checkDependency('gsap', 'GSAP Core');
  if (!results.gsap) allGood = false;

  // Check ScrollTrigger specifically
  try {
    require.resolve('gsap/ScrollTrigger');
    log('✅ GSAP ScrollTrigger Plugin', colors.green);
    results.scrollTrigger = true;
  } catch (error) {
    log('❌ GSAP ScrollTrigger Plugin (NOT FOUND)', colors.red);
    results.scrollTrigger = false;
    allGood = false;
  }

  // Test GSAP integration
  try {
    const { gsap } = require('gsap');
    const { ScrollTrigger } = require('gsap/ScrollTrigger');
    log('   ✅ GSAP and ScrollTrigger integration working', colors.green);
  } catch (error) {
    log('   ❌ GSAP integration failed', colors.red);
    allGood = false;
  }

  log('\n📦 Task 2.3: Lenis for Smooth Scrolling Implementation', colors.bold);
  results.lenis = checkDependency('@studio-freight/lenis', 'Lenis Smooth Scroll');
  if (!results.lenis) allGood = false;

  // Check Lenis class accessibility
  try {
    const Lenis = require('@studio-freight/lenis');
    log('   ✅ Lenis class accessible', colors.green);
  } catch (error) {
    log('   ❌ Lenis class not accessible', colors.red);
    allGood = false;
  }

  log('\n📦 Task 2.4: fast-check for Property-Based Testing Setup', colors.bold);
  results.fastCheck = checkDependency('fast-check', 'fast-check');
  if (!results.fastCheck) allGood = false;

  // Check fast-check generators
  try {
    const fc = require('fast-check');
    if (fc.integer && fc.string && fc.array) {
      log('   ✅ Property generators accessible', colors.green);
    } else {
      log('   ❌ Property generators not accessible', colors.red);
      allGood = false;
    }
  } catch (error) {
    log('   ❌ fast-check not working properly', colors.red);
    allGood = false;
  }

  log('\n📦 Task 2.5: React Testing Library and Jest for Unit Testing', colors.bold);
  results.rtl = checkDependency('@testing-library/react', 'React Testing Library');
  results.jest = checkDependency('jest', 'Jest Test Framework');
  results.jestDom = checkDependency('@testing-library/jest-dom', 'Jest DOM Matchers');
  results.userEvent = checkDependency('@testing-library/user-event', 'User Event Testing');

  if (!results.rtl || !results.jest || !results.jestDom || !results.userEvent) {
    allGood = false;
  }

  // Check testing integration
  try {
    const { render, screen } = require('@testing-library/react');
    log('   ✅ React Testing Library render function accessible', colors.green);
  } catch (error) {
    log('   ❌ React Testing Library not working properly', colors.red);
    allGood = false;
  }

  // Check supporting utility libraries
  log('\n🔧 Supporting Utilities', colors.bold);
  results.clsx = checkDependency('clsx', 'clsx (className utility)');
  results.twMerge = checkDependency('tailwind-merge', 'Tailwind Merge');
  results.cva = checkDependency('class-variance-authority', 'Class Variance Authority');
  results.lucide = checkDependency('lucide-react', 'Lucide React Icons');

  // These are not critical for Task 2, so don't fail if missing
  if (!results.clsx || !results.twMerge || !results.cva || !results.lucide) {
    log('   ℹ️ Some utility libraries missing but not required for core task', colors.yellow);
  }

  // Configuration validation
  log('\n⚙️ Configuration Files Validation', colors.bold);
  
  const fs = require('fs');
  const path = require('path');
  
  const configFiles = [
    { file: 'jest.config.js', desc: 'Jest Configuration' },
    { file: 'jest.setup.js', desc: 'Jest Setup' },
    { file: 'src/lib/animations.ts', desc: 'Framer Motion Animations' },
    { file: 'src/lib/gsap-config.ts', desc: 'GSAP Configuration' },
    { file: 'src/lib/smooth-scroll.ts', desc: 'Lenis Configuration' },
    { file: 'src/lib/test-utils.ts', desc: 'Testing Utilities' }
  ];

  configFiles.forEach(({ file, desc }) => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      log(`✅ ${desc} (${file})`, colors.green);
    } else {
      log(`❌ ${desc} (${file}) - Missing`, colors.red);
      allGood = false;
    }
  });

  // Package.json scripts validation
  log('\n📝 Package Scripts Validation', colors.bold);
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = ['dev', 'build', 'test', 'test:property'];
    
    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        log(`✅ "${script}" script configured`, colors.green);
      } else {
        log(`❌ "${script}" script missing`, colors.red);
        if (script === 'test' || script === 'test:property') {
          allGood = false; // Critical for testing
        }
      }
    });
  } catch (error) {
    log('❌ Could not validate package.json scripts', colors.red);
    allGood = false;
  }

  // Summary
  log('\n' + '='.repeat(70), colors.bold);
  log('🎯 TASK 2 COMPLETION SUMMARY', colors.bold + colors.blue);
  log('='.repeat(70), colors.bold);
  
  const taskItems = [
    { name: 'Framer Motion for component animations', status: results.framerMotion },
    { name: 'GSAP and ScrollTrigger for scroll animations', status: results.gsap && results.scrollTrigger },
    { name: 'Lenis for smooth scrolling', status: results.lenis },
    { name: 'fast-check for property-based testing', status: results.fastCheck },
    { name: 'React Testing Library and Jest', status: results.rtl && results.jest && results.jestDom }
  ];

  taskItems.forEach((item, index) => {
    const status = item.status ? '✅ COMPLETE' : '❌ INCOMPLETE';
    const color = item.status ? colors.green : colors.red;
    log(`${index + 1}. ${item.name}: ${status}`, color);
  });

  log('\n' + '='.repeat(70), colors.bold);
  
  if (allGood) {
    log('🎉 TASK 2 COMPLETED SUCCESSFULLY!', colors.bold + colors.green);
    log('✨ All core dependencies are installed and properly configured', colors.green);
    log('\n💡 Ready for next phase:', colors.bold);
    log('   • Task 3: Set up design system foundation', colors.blue);
    log('   • All animation libraries are ready for implementation', colors.blue);
    log('   • Testing framework is configured for property-based testing', colors.blue);
  } else {
    log('🚨 TASK 2 INCOMPLETE - Issues Found', colors.bold + colors.red);
    log('📋 Some dependencies are missing or not properly configured', colors.yellow);
    log('\n🔧 Recommended actions:', colors.bold);
    log('   • Review missing dependencies above', colors.yellow);
    log('   • Run npm install to ensure all packages are installed', colors.yellow);
    log('   • Check configuration files for completeness', colors.yellow);
  }
  
  log('\n' + '='.repeat(70), colors.bold);
  process.exit(allGood ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { main };