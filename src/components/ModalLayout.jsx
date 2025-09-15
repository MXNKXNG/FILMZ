import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

// 모달 시 뒷 배경 제어할 DOM 요소
export const ModalPortal = ({ children }) => {
  const [el] = useState(() => document.createElement("div"));
  useLayoutEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return createPortal(children, el);
};

// 모달 공통 레이아웃
export const ModalLayout = ({ showModal, onClose, children }) => {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    if (showModal) {
      setMounted(true);
      setPhase("enter");
    } else if (mounted) {
      setPhase("exit");
    }
  }, [showModal, mounted]);

  if (!mounted) return null;

  return (
    <ModalPortal>
      <section className="flex justify-end px-40 max-[1025px]:justify-center max-[1025px]:px-0 ">
        <div
          onClick={onClose}
          className={`${
            phase === "enter"
              ? "opacity-100 animate-fade-in"
              : "opacity-0 animate-fade-out"
          } fixed inset-0 z-10 bg-black/50 backdrop-blur-xs transition-all duration-300`}
        ></div>

        <nav
          onClick={onClose}
          role="dialog"
          aria-modal={true}
          onAnimationEnd={() => {
            if (phase === "exit") setMounted(false);
          }}
          className={`fixed right-0 h-[70dvh] flex top-0 w-full z-40 transition-all ${
            phase === "enter" ? "animate-fade-in" : "animate-fade-out"
          }
            `}
        >
          <div className="h-full overflow-scroll w-full rounded-b-2xl scrollbar-none ">
            {children}
          </div>
        </nav>
      </section>
    </ModalPortal>
  );
};
