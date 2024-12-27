'use client';

import Button from '@/components/ui/Button';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { type Provider } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Github className="h-5 w-5" />
    },
    {
      name: 'google',
      displayName: 'Google',
      icon: <Image src="/images/google.svg" alt="Google" width={20} height={20} />
    }
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            variant="slim"
            type="submit"
            className="w-full"
            loading={isSubmitting}
          >
            <span className="mr-2">{provider.icon}</span>
            <span>Continue with {provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
