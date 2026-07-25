/**
 * Dependency Check and Configuration Validation
 * Validates that all required dependencies are properly installed and configured
 */

// Check if core dependencies are available
export const validateDependencies = (): { success: boolean; errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check Framer Motion
  try {
    require('framer-motion');
    console.log('✅ Framer Motion is available');
  } catch (error) {
    errors.push('❌ Framer Motion is not installed or configured properly');
  }

  // Check GSAP
  try {
    require('gsap');
    console.log('✅ GSAP is available');
  } catch (error) {
    errors.push('❌ GSAP is not installed or configured properly');
  }

  // Check GSAP ScrollTrigger
  try {
    require('gsap/ScrollTrigger');
    console.log('✅ GSAP ScrollTrigger is available');
  } catch (error) {
    errors.push('❌ GSAP ScrollTrigger is not available');
  }

  // Check Lenis
  try {
    require('@studio-freight/lenis');
    console.log('✅ Lenis is available');
  } catch (error) {
    errors.push('❌ Lenis is not installed or configured properly');
  }

  // Check fast-check
  try {
    require('fast-check');
    console.log('✅ fast-check is available');
  } catch (error) {
    errors.push('❌ fast-check is not installed or configured properly');
  }

  // Check React Testing Library
  try {
    require('@testing-library/react');
    console.log('✅ React Testing Library is available');
  } catch (error) {
    errors.push('❌ React Testing Library is not installed or configured properly');
  }

  // Check Jest
  try {
    require('jest');
    console.log('✅ Jest is available');
  } catch (error) {
    errors.push('❌ Jest is not installed or configured properly');
  }

  // Check class-variance-authority (useful for component variants)
  try {
    require('class-variance-authority');
    console.log('✅ class-variance-authority is available');
  } catch (error) {
    warnings.push('⚠️ class-variance-authority might be useful for component variants');
  }

  // Check clsx (for conditional className logic)
  try {
    require('clsx');
    console.log('✅ clsx is available');
  } catch (error) {
    warnings.push('⚠️ clsx is recommended for conditional className logic');
  }

  // Check tailwind-merge (to avoid tailwind class conflicts)
  try {
    require('tailwind-merge');
    console.log('✅ tailwind-merge is available');
  } catch (error) {
    warnings.push('⚠️ tailwind-merge is recommended to avoid Tailwind class conflicts');
  }

  return {
    success: errors.length === 0,
    errors,
    warnings
  };
};

// Validate animation library configurations
export const validateAnimationSetup = (): boolean => {
  let isValid = true;

  // Check if GSAP plugins can be imported
  try {
    const { gsap } = require('gsap');
    const { ScrollTrigger } = require('gsap/ScrollTrigger');
    
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    console.log('✅ GSAP and ScrollTrigger integration successful');
  } catch (error) {
    console.error('❌ GSAP ScrollTrigger integration failed:', error);
    isValid = false;
  }

  // Check Framer Motion components
  try {
    const { motion } = require('framer-motion');
    console.log('✅ Framer Motion motion component available');
  } catch (error) {
    console.error('❌ Framer Motion motion component not available:', error);
    isValid = false;
  }

  // Check Lenis integration
  try {
    const Lenis = require('@studio-freight/lenis').default;
    console.log('✅ Lenis class available');
  } catch (error) {
    console.error('❌ Lenis class not available:', error);
    isValid = false;
  }

  return isValid;
};

// Validate testing setup
export const validateTestingSetup = (): boolean => {
  let isValid = true;

  // Check Jest configuration
  try {
    const jestConfig = require('../../jest.config.js');
    console.log('✅ Jest configuration loaded');
  } catch (error) {
    console.error('❌ Jest configuration not found:', error);
    isValid = false;
  }

  // Check React Testing Library
  try {
    const { render } = require('@testing-library/react');
    console.log('✅ React Testing Library render function available');
  } catch (error) {
    console.error('❌ React Testing Library not properly configured:', error);
    isValid = false;
  }

  // Check fast-check
  try {
    const fc = require('fast-check');
    console.log('✅ fast-check property testing library available');
  } catch (error) {
    console.error('❌ fast-check not properly configured:', error);
    isValid = false;
  }

  return isValid;
};

// Main validation function
export const validateAllSetup = (): void => {
  console.log('🔍 Validating dependency setup...\n');

  const depCheck = validateDependencies();
  const animationCheck = validateAnimationSetup();
  const testingCheck = validateTestingSetup();

  console.log('\n📋 Validation Summary:');
  console.log(`Dependencies: ${depCheck.success ? '✅ All good' : '❌ Issues found'}`);
  console.log(`Animations: ${animationCheck ? '✅ Configured properly' : '❌ Configuration issues'}`);
  console.log(`Testing: ${testingCheck ? '✅ Ready for testing' : '❌ Testing setup incomplete'}`);

  if (depCheck.errors.length > 0) {
    console.log('\n🚨 Errors found:');
    depCheck.errors.forEach(error => console.log(error));
  }

  if (depCheck.warnings.length > 0) {
    console.log('\n⚠️ Recommendations:');
    depCheck.warnings.forEach(warning => console.log(warning));
  }

  const overallSuccess = depCheck.success && animationCheck && testingCheck;
  console.log(`\n${overallSuccess ? '🎉 Setup validation complete - ready to proceed!' : '🔧 Setup needs attention before proceeding'}`);
};

// Export validation result type
export interface ValidationResult {
  dependencies: ReturnType<typeof validateDependencies>;
  animations: boolean;
  testing: boolean;
  overall: boolean;
}

// Get complete validation result
export const getValidationResult = (): ValidationResult => {
  const dependencies = validateDependencies();
  const animations = validateAnimationSetup();
  const testing = validateTestingSetup();
  const overall = dependencies.success && animations && testing;

  return {
    dependencies,
    animations,
    testing,
    overall
  };
};