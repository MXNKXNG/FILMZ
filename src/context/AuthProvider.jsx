import { useQueryClient } from "@tanstack/react-query";
import { createContext, use, useEffect, useRef, useState } from "react";
import { fetchProfile } from "../features/profiles/queries";
import { autoNickname } from "../features/utils/autoNickname";
import { QK } from "../features/utils/queryKeys";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
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

// provider
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const setSessionGlobal = useAuthStore((s) => s.setSession);
  const clearSessionGlobal = useAuthStore((s) => s.clearSession);
  const [error, setError] = useState(null);
  const showToast = useToastStore((s) => s.show);
  const initDoneRef = useRef(false);
  const wasAuthedRef = useRef(false);

  // 초기 세션 세팅
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSessionGlobal(session || null);

      // 이전 이벤트 상태
      wasAuthedRef.current = !!session;
      // 초기 세션 세팅 플래그
      initDoneRef.current = true;
    })();

    // 변환 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      // 초기 동기화 이전 신호 가드
      if (!initDoneRef.current) return;

      if (newSession) setSessionGlobal(newSession);
      else clearSessionGlobal();

      // 상태 전이
      const now = !!newSession;
      const was = wasAuthedRef.current;
      const signInedTransition = !was && now;
      const signOutedTransition = was && !now;

      // tanstack/query 캐시 무효화 -- 동기화
      if (event === "SIGNED_IN" && signInedTransition) {
        queryClient.invalidateQueries({ queryKey: QK.profile() });
        queryClient.invalidateQueries({ queryKey: QK.favorites() });
        queryClient.invalidateQueries({ queryKey: QK.comments() });

        // 우선 적용
        if (newSession?.user?.id) {
          const userId = newSession.user.id;
          queryClient.prefetchQuery({
            queryKey: QK.profile(userId),
            queryFn: () => fetchProfile(userId),
          });
        }

        showToast({ type: "login", message: "로그인", time: 2000 });
      }

      if (event === "SIGNED_OUT" && signOutedTransition) {
        queryClient.removeQueries({
          predicate: (q) =>
            ["profile", "favorites", "comments"].includes(q.queryKey?.[0]),
        });
        showToast({ type: "logout", message: "로그아웃", time: 2000 });
      }

      // 토스트 로직 이후 상태 최신화
      wasAuthedRef.current = now;
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient, setSessionGlobal, clearSessionGlobal, showToast]);

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

  const value = {
    error,
    signUp,
    signIn,
    signOut,
  };
  return <SUPABASE value={value}>{children}</SUPABASE>;
};
