import AnimatedBackground from "@/components/AnimatedBackground";

export default function RootLayout({ children }) {
  return (
    <div className=" bg-gray-900 text-white">
      <AnimatedBackground />
      {children}
    </div>
  );
}