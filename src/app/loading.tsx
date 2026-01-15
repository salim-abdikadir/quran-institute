export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - Emerald Green */}
        <div className="absolute w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        
        {/* Inner Ring - Gold (Rotating Opposite) */}
        <div className="absolute w-16 h-16 border-4 border-accent/20 border-b-accent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Center Point */}
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
        
        {/* Background Glow */}
        <div className="absolute w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  );
}
