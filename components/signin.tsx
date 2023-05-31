import { signIn } from 'next-auth/react';

export default function SignIn() {
  const buttonStyles =
    'items-center mr-4 rounded-md border bg-pgl-blue px-4 py-2 font-medium text-white hover:border-pgl-blue hover:bg-white hover:text-pgl-blue hover:shadow-lg';

  return (
    <div className="container mt-8">
      <article>
        <h1>Bist du richtig hier?</h1>
        <button className={buttonStyles} onClick={() => signIn()}>
          Anmelden
        </button>
      </article>
    </div>
  );
}
