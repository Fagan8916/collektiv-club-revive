
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('useAuth: Initializing authentication');
    
    // Safety fallback: ensure we never hang in loading state
    const href = window.location.href;
    const hasAuthIndicators = /[?#&](access_token|refresh_token|code|provider_token|provider_refresh_token|type)=/.test(href) || href.includes('#access_token=');
    const inProgress = (() => { try { return sessionStorage.getItem('auth_in_progress') === '1'; } catch { return false; } })();
    const fallbackDelay = (hasAuthIndicators || inProgress) ? 10000 : 2500;
    const fallbackTimer = window.setTimeout(() => {
      console.warn('useAuth: Fallback timeout - forcing loading complete (delay ms):', fallbackDelay);
      setLoading(false);
    }, fallbackDelay);
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
        window.clearTimeout(fallbackTimer);
        try { sessionStorage.removeItem('auth_in_progress'); } catch {}

        // Soft guard: if signed in, check for profile completeness and prompt
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user?.id) {
          const uid = session.user.id;
          const guardKey = `profile_guard_shown_${uid}`;
          // Avoid spamming the toast repeatedly
          if (!localStorage.getItem(guardKey)) {
            try {
              const { data: profile, error } = await supabase
                .from('member_profiles')
                .select('id, first_name, full_name')
                .eq('user_id', uid)
                .maybeSingle();

              if (error) {
                console.warn('useAuth: Guard profile fetch error', error);
              } else {
                const missing =
                  !profile ||
                  ((!profile.first_name || profile.first_name.trim() === '') &&
                   (!profile.full_name || profile.full_name.trim() === ''));
                if (missing) {
                  toast({
                    title: "Complete your profile",
                    description: "Add your name and details to appear in the member directory.",
                  });
                  localStorage.setItem(guardKey, '1');
                }
              }
            } catch (e) {
              console.warn('useAuth: Guard check failed', e);
            }
          }
        }
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
          try { if (session) sessionStorage.removeItem('auth_in_progress'); } catch {}
        }
      } catch (error) {
        console.error('useAuth: Session fetch error:', error);
      } finally {
        setLoading(false);
        window.clearTimeout(fallbackTimer);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
      window.clearTimeout(fallbackTimer);
    };
  }, [toast]);

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
