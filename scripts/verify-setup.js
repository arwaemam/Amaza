#!/usr/bin/env node

/**
 * Setup Verification Script
 * Verifies that all dependencies are installed and configured properly
 */

const fs = require('fs');
const path = require('path');

// Color utilities for console output
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

function checkDependency(depName, isDevDep = false) {
  try {
    require.resolve(depName);
    log(`✅ ${depName} is available`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${depName} is not available`, colors.red);
    return false;
  }
}

function checkFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    log(`✅ ${description} exists at ${filePath}`, colors.green);
    return true;
  } else {
    log(`❌ ${description} missing at ${filePath}`, colors.red);
    return false;
  }
}

function main() {
  log('\n🔍 Verifying AmazePMS Website Setup\n', colors.bold + colors.blue);

  let allGood = true;

  // Check core dependencies
  log('📦 Checking Core Dependencies:', colors.bold);
  const coreDeps = [
    'next',
    'react',
    'react-dom',
    'framer-motion',
    'gsap',
    '@studio-freight/lenis',
    'clsx',
    'tailwind-merge',
    'lucide-react',
    'class-variance-authority'
  ];

  coreDeps.forEach(dep => {
    if (!checkDependency(dep)) allGood = false;
  });

  // Check dev dependencies
  log('\n🛠️  Checking Development Dependencies:', colors.bold);
  const devDeps = [
    'typescript',
    '@types/node',
    '@types/react',
    '@types/react-dom',
    'jest',
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
    'fast-check',
    'eslint',
    'prettier',
    'tailwindcss'
  ];

  devDeps.forEach(dep => {
    if (!checkDependency(dep)) allGood = false;
  });

  // Check GSAP ScrollTrigger specifically
  log('\n🎬 Checking Animation Libraries:', colors.bold);
  try {
    require.resolve('gsap/ScrollTrigger');
    log('✅ GSAP ScrollTrigger is available', colors.green);
  } catch (error) {
    log('❌ GSAP ScrollTrigger is not available', colors.red);
    allGood = false;
  }

  // Check configuration files
  log('\n⚙️  Checking Configuration Files:', colors.bold);
  const configFiles = [
    ['package.json', 'Package configuration'],
    ['tsconfig.json', 'TypeScript configuration'],
    ['tailwind.config.ts', 'Tailwind CSS configuration'],
    ['next.config.js', 'Next.js configuration'],
    ['jest.config.js', 'Jest configuration'],
    ['jest.setup.js', 'Jest setup file'],
    ['.eslintrc.json', 'ESLint configuration'],
    ['.prettierrc', 'Prettier configuration']
  ];

  configFiles.forEach(([file, desc]) => {
    if (!checkFile(file, desc)) allGood = false;
  });

  // Check essential library files
  log('\n📚 Checking Library Files:', colors.bold);
  const libFiles = [
    ['src/lib/animations.ts', 'Animation utilities'],
    ['src/lib/gsap-config.ts', 'GSAP configuration'],
    ['src/lib/gsap-animations.ts', 'GSAP animation setup'],
    ['src/lib/smooth-scroll.ts', 'Smooth scroll configuration'],
    ['src/lib/test-utils.ts', 'Testing utilities'],
    ['src/lib/utils.ts', 'General utilities'],
    ['src/lib/types.ts', 'TypeScript type definitions']
  ];

  libFiles.forEach(([file, desc]) => {
    if (!checkFile(file, desc)) allGood = false;
  });

  // Check if package.json has the correct scripts
  log('\n📝 Checking Package Scripts:', colors.bold);
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = [
      'dev',
      'build', 
      'start',
      'lint',
      'test',
      'type-check'
    ];

    requiredScripts.forEach(script => {
      if (packageJson.scripts && packageJson.scripts[script]) {
        log(`✅ Script "${script}" is configured`, colors.green);
      } else {
        log(`❌ Script "${script}" is missing`, colors.red);
        allGood = false;
      }
    });
  } catch (error) {
    log('❌ Could not read package.json', colors.red);
    allGood = false;
  }

  // Final summary
  log('\n' + '='.repeat(60), colors.bold);
  if (allGood) {
    log('🎉 All dependencies and configurations are properly set up!', colors.bold + colors.green);
    log('✨ Ready to start development with AmazePMS Website Redesign', colors.green);
    log('\n💡 Next steps:', colors.bold);
    log('   - Run "npm run dev" to start development server', colors.blue);
    log('   - Run "npm test" to run the test suite', colors.blue);
    log('   - Run "npm run build" to create production build', colors.blue);
  } else {
    log('🔧 Some dependencies or configurations need attention', colors.bold + colors.red);
    log('📋 Please review the issues above and resolve them before proceeding', colors.yellow);
    log('\n💡 Common solutions:', colors.bold);
    log('   - Run "npm install" to install missing dependencies', colors.blue);
    log('   - Check if Node.js and npm are properly installed', colors.blue);
    log('   - Verify that all configuration files are in place', colors.blue);
  }
  log('\n' + '='.repeat(60), colors.bold);

  process.exit(allGood ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { main };