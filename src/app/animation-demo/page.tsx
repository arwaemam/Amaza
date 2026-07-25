import type { Metadata } from 'next';
import { AnimationDemo } from '@/components/animations/AnimationDemo';

export const metadata: Metadata = {
  title: 'Animation System Demo - AmazePMS',
  description: 'Demonstration of the comprehensive animation system with component-level animations',
};

export default function AnimationDemoPage() {
  return <AnimationDemo />;
}