import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabaseClient, signOut } from '../api/session.supabase';
import { Center } from '@chakra-ui/react';

export const SignIn = () => {
  return (
    <Center w="100vw" h="100vh">
      <Auth
        data-testid="supabase-session"
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={['github' /*, 'linkedin', 'google' */]}
      />
    </Center>
  );
};

export const SignOut = () => {
  return <button onClick={() => signOut({})}>sign out </button>;
};
