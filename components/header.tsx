import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-white/50 px-2 backdrop-blur-sm md:px-4">
      <Image src="/header.png" alt="header" className="h-4 md:h-8" width={488} height={32} />
    </header>
  );
}
