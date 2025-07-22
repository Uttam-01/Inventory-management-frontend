"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const GlobalLoaderB = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 200); // Small debounce, can be 0 if needed
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};

export default GlobalLoaderB;
