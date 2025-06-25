
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useAuth: Initializing authentication');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('useAuth: Auth state change:', event, !!session);
        console.log('useAuth: Session details:', session ? {
          access_token: !!session.access_token,
          refresh_token: !!session.refresh_token,
          expires_at: session.expires_at,
          user_id: session.user?.id,
          user_email: session.user?.email
        } : null);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN get initial session
    const getInitialSession = async () => {
      try {
        console.log('useAuth: Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('useAuth: Error getting session:', error);
        } else {
          console.log('useAuth: Initial session:', !!session);
          if (session) {
            console.log('useAuth: Initial session details:', {
              access_token: !!session.access_token,
              refresh_token: !!session.refresh_token,
              expires_at: session.expires_at,
              user_id: session.user?.id,
              user_email: session.user?.email
            });
          }
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('useAuth: Session fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log('useAuth: Signing out');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('useAuth: Sign out error:', error);
    }
  };

  const isAuthenticated = !!(session && user);

  return {
    user,
    session,
    loading,
    isAuthenticated,
    signOut
  };
};
