
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

/**
 * useAuth: Handles Supabase auth state
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    // Load session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return false;
    }
    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
      toast({ title: "Login successful", description: "Signed in!" });
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      return false;
    }
    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
      toast({ title: "Signup successful", description: "Welcome! Please check your email for verification." });
      return true;
    }
    if (data.user) {
      setUser(data.user);
      toast({ title: "Check your email", description: "A verification link has been sent." });
    }
    return true;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    toast({ title: "Logged out", description: "You have been signed out." });
  }, []);

  return { user, session, loading, login, signup, logout };
}

