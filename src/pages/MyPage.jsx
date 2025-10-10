import { useRef, useState } from "react";
import { ModalLayout } from "../components/ModalLayout";
import { UpdateInfoModal } from "../components/UpdateInfoModal";
import { useAvatarMutation } from "../features/profiles/useAvatarMutation";
import { useAvatarUrl } from "../features/profiles/useAvatarUrl";
import { useProfileQuery } from "../features/profiles/useProfileQuery";
import { useAuthStore } from "../store/authStore";

export const MyPage = () => {
  const userId = useAuthStore((s) => s.userId);
  const { data } = useProfileQuery(userId);
  const { url } = useAvatarUrl(data?.profile_path, data?.updated_at);
  const fileRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const { mutate: changeAvatar, isPending, error } = useAvatarMutation(userId);

  // 모달 핸들러
  const modalHandle = () => {
    setShowModal((prev) => !prev);
  };

  // 프로필 이미지 변경 핸들러
  const onChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    changeAvatar(file, {
      onSettled: () => {
        if (fileRef.current) fileRef.current.value = "";
      },
    });
  };

  return (
    <section className="flex w-full h-full whitespace-nowrap text-base">
      <article className="flex-1 flex flex-col gap-2 justify-center items-center">
        {error ? (
          <p>{error}</p>
        ) : (
          <img
            className="rounded-full aspect-1/1 min-w-32 max-w-32 max-[513px]:min-w-24 max-[513px]:max-w-24"
            src={url}
            width={128}
            alt="profile Image"
          />
        )}

        <label className="px-3 py-1.5 cursor-pointer active:scale-90 hover:text-white text-gray-500 border rounded-xl max-[513px]:text-[10px] text-xs">
          {isPending ? "Editing..." : "Edit image"}
          <input
            onChange={onChange}
            ref={fileRef}
            accept="image/*"
            className="hidden"
            type="file"
          />
        </label>
      </article>
      {data && (
        <article className="flex-2 flex flex-col gap-6 px-10 max-[513px]:text-[10px] text-xs">
          <div className="flex justify-between items-center">
            <p className="max-[513px]:text-xs text-sm">{data?.nickname}</p>
            <button
              onClick={modalHandle}
              className="px-3 py-1.5 max-[513px]:py-1 cursor-pointer active:scale-90 hover:text-white text-gray-500 border rounded-xl"
            >
              Edit nickname
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="max-[513px]:text-xs text-sm">{data?.email}</p>
          </div>
          <ModalLayout showModal={showModal} onClose={modalHandle}>
            <UpdateInfoModal showModal={showModal} onClose={modalHandle} />
          </ModalLayout>
        </article>
      )}
    </section>
  );
};
