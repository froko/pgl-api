import { useSession, signIn, signOut } from 'next-auth/react';
import { Deploy } from '@/components/deploy';
import { Guestbook } from '@/components/guestbook';
import SignIn from '@/components/signin';
import SignOut from '@/components/signout';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main>
        <SignOut />
        <Deploy />
        <Guestbook />
      </main>
    );
  } else {
    return (
      <main>
        <SignIn />
      </main>
    );
  }
}
