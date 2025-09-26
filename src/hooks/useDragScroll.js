import { useEffect, useRef } from "react";

export const useDragScroll = (ref, { axis = "x", slop = 6 } = {}) => {
  const state = useRef({
    isDown: false,
    moved: false,
    startPos: 0,
    startScroll: 0,
  });

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    // 마우스 드래그 시작
    const handlePointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      state.current.isDown = true;
      state.current.moved = false;

      if (axis === "x") {
        state.current.startPos = e.clientX;
        state.current.startScroll = el.scrollLeft;
      } else {
        state.current.startPos = e.clientY;
        state.current.startScroll = el.scrollTop;
      }
    };

    // 마우스 드래그 이동
    const handlePointerMove = (e) => {
      if (!state.current.isDown) return;

      const delta =
        axis === "x"
          ? e.clientX - state.current.startPos
          : e.clientY - state.current.startPos;

      if (!state.current.moved && Math.abs(delta) < slop) return;
      if (!state.current.moved && Math.abs(delta) >= slop) {
        state.current.moved = true;
        el.setPointerCapture?.(e.pointerId);
      }

      if (axis === "x") {
        el.scrollLeft = state.current.startScroll - delta;
      } else {
        el.scrollTop = state.current.startScroll - delta;
      }
      e.preventDefault();
    };

    // 마우스 드래그 종료
    const handlePointerUp = (e) => {
      if (!state.current.isDown) return;

      state.current.isDown = false;
      state.current.moved = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    const handleDragStart = (e) => {
      e.preventDefault();
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove, { passive: false });
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointerleave", handlePointerUp);
    el.addEventListener("pointercancel", handlePointerUp);
    el.addEventListener("dragstart", handleDragStart);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove, {
        passive: false,
      });
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointerleave", handlePointerUp);
      el.removeEventListener("pointercancel", handlePointerUp);
      el.removeEventListener("dragstart", handleDragStart);
    };
  }, [ref?.current, axis, slop]);
};
