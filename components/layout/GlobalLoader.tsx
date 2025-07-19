// components/common/GlobalLoader.tsx
export default function GlobalLoader() {
  return (
    <div className="h-full inset-0 bg-white bg-opacity-50 z-[9999] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
