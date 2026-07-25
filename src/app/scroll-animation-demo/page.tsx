import type { Metadata } from 'next';
import { ScrollAnimationDemo } from './ScrollAnimationDemo';

export const metadata: Metadata = {
  title: 'Complex Scroll Animations Demo - AmazePMS',
  description:
    'Experience our advanced scroll animations including parallax effects, animated counters, and timeline sequences.',
  robots: 'noindex, nofollow', // Demo page, don't index
};

export default function ScrollAnimationDemoPage() {
  return <ScrollAnimationDemo />;
}