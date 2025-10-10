import { useToastStore } from "../store/toastStore";

export const Toaster = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <article className="">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="fixed animate-fade-in text-center left-[48dvw] flex justify-center items-center max-[513px]:top-0 top-2 min-[2048px]:top-8 min-[2048px]:text-lg z-50 text-white text-nowrap"
        >
          <h2 className="py-4 flex justify-center">
            <span
              className={`relative pr-1 ${
                t.type === "login" ? "text-green-500" : "text-[#a04455]"
              }`}
            >
              ✔︎
            </span>
            {t.message}
          </h2>
        </div>
      ))}
    </article>
  );
};
