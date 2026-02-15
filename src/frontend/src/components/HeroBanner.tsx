import { Sparkles } from 'lucide-react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  description?: string;
}

export default function HeroBanner({ title, subtitle, description }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-12 animate-in fade-in scale-in duration-700">
      {/* Background layers */}
      <div className="absolute inset-0 hero-mesh-bg opacity-80" />
      <div className="absolute inset-0 geo-pattern-bg" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80" />
      
      {/* Corner ornaments */}
      <div className="absolute top-0 right-0 w-64 h-64 corner-ornament opacity-10" style={{ backgroundPosition: 'top right' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 corner-ornament opacity-10 rotate-180" style={{ backgroundPosition: 'bottom left' }} />
      
      {/* Content */}
      <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 animate-in slide-in-from-bottom-4 duration-500">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">{subtitle}</span>
        </div>
        
        <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms' }}>
          {title}
        </h1>
        
        {description && (
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
            {description}
          </p>
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-8 w-2 h-2 rounded-full bg-white/40 animate-pulse" />
        <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '500ms' }} />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '1000ms' }} />
      </div>
    </div>
  );
}
