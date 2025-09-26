import { useEffect, useRef } from "react";

export const useDragScroll = (ref, { axis = "x" } = {}) => {
  const state = useRef({ isDown: false, startPos: 0, startScroll: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 마우스 드래그 시작
    const handlePointerDown = (e) => {
      state.current.isDown = true;
      el.classList.add("dragging");

      if (axis === "x") {
        state.current.startPos = e.clientX;
        state.current.startScroll = el.scrollLeft;
      } else {
        state.current.startPos = e.clientY;
        state.current.startScroll = el.scrollTop;
      }
      el.setPointerCapture?.(e.pointerId);
    };

    // 마우스 드래그 이동
    const handlePointerMove = (e) => {
      if (!state.current.isDown) return;

      const x = e.clientX - state.current.startPos;
      const y = e.clientY - state.current.startPos;

      if (axis === "x") {
        el.scrollLeft = state.current.startScroll - x;
      } else {
        el.scrollTop = state.current.startScroll - y;
      }
      e.preventDefault();
    };

    // 마우스 드래그 종료
    const handlePointerUp = (e) => {
      if (!state.current.isDown) return;

      state.current.isDown = false;
      el.classList.remove("dragging");
      el.releasePointerCapture?.(e.pointerId);
    };

    // 마우스 휠 입력량 -> 가로축 스크롤 +
    const handleWheel = (e) => {
      if (axis !== "x") return;

      const preferY = Math.abs(e.deltaY) >= Math.abs(e.deltaX);

      if (preferY) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove, { passive: false });
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointerleave", handlePointerUp);
    el.addEventListener("pointercancel", handlePointerUp);
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointerleave", handlePointerUp);
      el.removeEventListener("pointercancel", handlePointerUp);
      el.removeEventListener("wheel", handleWheel);
    };
  }, [ref, axis]);
};
