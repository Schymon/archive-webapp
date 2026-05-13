import { cn } from '@/lib/utils';

interface BackgroundProps {
  className?: string;
}

export const Background = ({ className }: BackgroundProps) => {
  return (
    <div
      className={cn('fixed inset-0 w-full h-full', className)}
      style={{ backgroundColor: '#ffffff', zIndex: -1 }}
    />
  );
};
