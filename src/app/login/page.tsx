'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Lock, ArrowRight, Github, Hotel } from 'lucide-react';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate auth
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = '/dashboard'; // Redirect demo
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white selection:bg-primary-100 selection:text-primary-900">
      
      {/* Left Panel: Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 bg-white relative z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                <Hotel className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-neutral-900 tracking-tight">
                Amaze<span className="text-primary-600">PMS</span>
              </span>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Don't have an account?{' '}
              <Link href="/pricing" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                Start your 14-day free trial
              </Link>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="email"
                type="email"
                label="Email address"
                required
                leftIcon={<Mail className="w-4 h-4" />}
                placeholder="you@example.com"
              />

              <div>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  required
                  leftIcon={<Lock className="w-4 h-4" />}
                  placeholder="••••••••"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-primary-600 hover:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Sign in
              </Button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-neutral-900">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Graphic/Illustration */}
      <div className="relative hidden w-0 flex-1 lg:block bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-10" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary-600 rounded-full blur-[120px]"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 p-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-lg"
          >
            <h3 className="text-4xl font-bold mb-6">Manage your properties with ease</h3>
            <p className="text-lg text-neutral-300 leading-relaxed mb-8">
              Join thousands of hoteliers who use AmazePMS to automate their daily operations, increase direct bookings, and elevate guest satisfaction.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-700 flex items-center justify-center text-xs">
                    {i}
                  </div>
                ))}
              </div>
              <span className="ml-2">Trusted by 10,000+ users</span>
            </div>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
