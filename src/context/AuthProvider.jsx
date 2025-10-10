import { createContext, use, useEffect, useRef, useState } from "react";
import { autoNickname } from "../features/profiles/autoNickname";
import { useAuthStore } from "../store/authStore";
import { supabase } from "./supabase";

const SUPABASE = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSupabase = () => {
  const supabase = use(SUPABASE);

  if (!supabase) {
    throw new Error("supabase가 초기화 되지 않았습니다.");
  }
  return supabase;
};

export const AuthProvider = ({ children }) => {
  const setSessionGlobal = useAuthStore((s) => s.setSession);
  const clearSessionGlobal = useAuthStore((s) => s.clearSession);
  const [session, setSession] = useState(null);
  const [lastAuthEvent, setLastAuthEvent] = useState(null);
  const [error, setError] = useState(null);
  const wasAuthedRef = useRef(false);
  const initDoneRef = useRef(false);

  // 초기 세션 세팅
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session || null);
      setSessionGlobal(session || null);
      wasAuthedRef.current = !!session;
      initDoneRef.current = true;
    })();

    // 변환 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!initDoneRef.current) return;
      setSession(newSession);

      if (newSession) {
        setSessionGlobal(newSession);
      } else {
        clearSessionGlobal();
      }

      const now = !!newSession;

      if (!wasAuthedRef.current && now) {
        setLastAuthEvent("SIGNED_IN");
      }
      if (wasAuthedRef.current && !now) {
        setLastAuthEvent("SIGNED_OUT");
      }
      wasAuthedRef.current = now;
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 회원가입
  const signUp = async (email, password) => {
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (!error) {
      if (data.user?.id) {
        // profiles 테이블에 upsert
        await autoNickname(data.user?.id, data.user?.email ?? "");
      }
      return { ok: true, user: data.user };
    }
    if (error) {
      setError(error.message);
      return { ok: false, error };
    }
  };

  // 로그인
  const signIn = async (email, password) => {
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return { ok: false, error };
    }

    return { ok: true, user: data.user };
  };

  // 로그아웃
  const signOut = async () => {
    setError(null);
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      await supabase.auth.signOut({ scope: "local" });
      setError(error.message);
      return { ok: false, error };
    }
    return { ok: true, data };
  };

  // 이벤트 상태 Clean-up 함수
  const clearLastAuthEvent = () => setLastAuthEvent(null);

  const value = {
    session,
    error,
    lastAuthEvent,
    clearLastAuthEvent,
    signUp,
    signIn,
    signOut,
  };
  return <SUPABASE value={value}>{children}</SUPABASE>;
};
