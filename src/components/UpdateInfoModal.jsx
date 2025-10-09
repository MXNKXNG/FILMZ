import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabase } from "../context/AuthProvider";
import { updateNickname } from "../features/profiles/profilesRepo";
import { nicknameSchema } from "../features/utils/nicknameSchema";

export const UpdateInfoModal = ({ showModal, onClose, onUpdated }) => {
  const { session } = useSupabase();
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // RHF 세팅
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(nicknameSchema),
    mode: "onChange",
    defaultValues: { nickname: "" },
  });

  // Submit 핸들러 - RHF 유효성 통과한 값만
  const onSubmit = async ({ nickname }) => {
    if (!session?.user?.id) {
      setMessage("로그인이 필요합니다.");
      return;
    }

    const result = await updateNickname(session?.user?.id, nickname);

    if (result?.ok) {
      setMessage("닉네임이 변경되었습니다.");
      await onUpdated?.();
      reset();

      timerRef.current = setTimeout(() => {
        onClose?.();
      }, 2000);
      return;
    } else {
      switch (result.code) {
        case "RLS":
          setMessage("닉네임 변경 권한이 없습니다.");
          break;
        case "NICKNAME":
          setMessage("이미 사용중인 닉네임입니다.");
          break;
        default:
          setMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const value = watch("nickname");

  // 포커스
  useEffect(() => {
    if (showModal) {
      inputRef.current?.focus();
      setMessage(null);
      reset({ nickname: "" });
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showModal, reset]);

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`whitespace-nowrap flex flex-col items-center justify-center text-base w-full h-full text-white ${
        showModal ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <article className="relative flex flex-col min-[1024px]:w-2/5 w-2/3 h-1/3 justify-center items-center border rounded-3xl">
        <button
          className="absolute top-2 right-3 h-10 w-10 max-[513px]:w-6 min-[2048px]:w-14 min-[2048px]:h-14 z-20 cursor-pointer group active:scale-75"
          onClick={onClose}
        >
          <span className="h-[1px] w-8 max-[513px]:w-6 min-[2048px]:w-14 group-hover:bg-white bg-gray-500 absolute top-5 min-[2048px]:top-7 right-1 min-[2048px]:right-0 rotate-45 z-30"></span>
          <span className="h-[1px] w-8 max-[513px]:w-6 min-[2048px]:w-14 group-hover:bg-white bg-gray-500 absolute top-5 min-[2048px]:top-7 right-1 min-[2048px]:right-0 -rotate-45 z-30"></span>
        </button>
        <form
          className="flex flex-col gap-2 w-full p-4 relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-auto flex gap-4 relative">
            <input
              ref={inputRef}
              disabled={isSubmitting}
              className=" text-black text-base min-[2048px]:text-2xl w-full h-12 max-[1025px]:h-10 min-[2048px]:h-16 rounded-2xl bg-white px-4 py-2 focus:border-2 border-[#FEE502] outline-none"
              type="text"
              {...register("nickname")}
            />
            {value && (
              <span
                onClick={() =>
                  reset({
                    nickname: "",
                  })
                }
                className="z-10 cursor-pointer absolute max-[1025px]:top-3 top-4 right-28 min-[2048px]:top-5 bg-gray-400 rounded-full text-xs font-light pb-0.5 aspect-1/1 h-4 min-[2048px]:h-6 flex items-center justify-center"
              >
                x
              </span>
            )}
            <button
              disabled={!isValid || isSubmitting}
              className={`rounded-2xl py-2 px-6 max-[513px]:text-xs ${
                isValid ? "bg-[#a04455]" : "bg-gray-600"
              }`}
              type="submit"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
          <div className="absolute -bottom-10 left-0 max-[513px]:text-xs max-[1025px]:text-sm">
            {message && <p className="p-4 text-red-500">{message}</p>}
            {errors.nickname && (
              <p className="p-4 text-red-500">{errors.nickname.message}</p>
            )}
          </div>
        </form>
      </article>
    </section>
  );
};
