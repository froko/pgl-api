import { signOut } from 'next-auth/react';
import { ArrowLeft } from './icons';

export default function SignOut() {
  return (
    <div className="container mt-8 flex">
      <span className="grow"></span>
      <div className="flex duration-200 md:hover:scale-110">
        <ArrowLeft />
        <button className="w-100 text-2xl font-bold text-pgl-blue md:hover:cursor-pointer" onClick={() => signOut()}>
          Abmelden
        </button>
      </div>
    </div>
  );
}
