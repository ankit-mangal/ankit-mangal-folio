import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => {
          const increment = Math.random() * 10 + 5; // Random increment between 5-15
          const newProgress = Math.min(prev + increment, 100);
          
          // When we reach 100%, notify parent component
          if (newProgress >= 100) {
            setTimeout(() => onLoadingComplete(), 500); // Small delay before hiding
          }
          
          return newProgress;
        });
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#293241] via-[#3d5a80] to-[#98c1d9]">
      <h1 className="text-5xl md:text-7xl font-bold text-[#e0fbfc] mb-8 tracking-tight">
        <span className="bg-gradient-to-r from-[#98c1d9] via-[#e0fbfc] to-[#98c1d9] bg-clip-text text-transparent">
          Ankit Mangal
        </span>
      </h1>
      
      <div className="w-64 md:w-80 h-2 bg-[#293241] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#98c1d9] to-[#e0fbfc] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-[#e0fbfc] font-medium">{Math.round(progress)}%</p>
    </div>
  );
}