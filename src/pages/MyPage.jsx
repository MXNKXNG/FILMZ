import { useRef, useState } from "react";
import { ModalLayout } from "../components/ModalLayout";
import { UpdateInfoModal } from "../components/UpdateInfoModal";
import { useSupabase } from "../context/AuthProvider";
import { supabase } from "../context/supabase";
import { avatarUpload } from "../features/profiles/avatarUpload";
import { useAvatarUrl } from "../features/profiles/useAvatarUrl";
import { useProfile } from "../features/profiles/useProfile";

export const MyPage = () => {
  const { session } = useSupabase();
  const { data, refetch } = useProfile(session?.user?.id);
  const { url } = useAvatarUrl(data?.profile_path, data?.updated_at);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  // 모달 핸들러
  const modalHandle = () => {
    setShowModal((prev) => !prev);
  };

  // 프로필 이미지 변경 핸들러
  const onChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await avatarUpload(supabase, session?.user?.id, file);
    if (fileRef.current) fileRef.current.value = "";
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setError(null);
    await refetch();
  };

  return (
    <section className="flex w-full h-full whitespace-nowrap text-base">
      <article className="flex-1 flex flex-col gap-2 justify-center items-center">
        {error ? (
          <p>{error}</p>
        ) : (
          <img
            className="rounded-full aspect-1/1 min-w-32 max-w-32"
            src={url}
            width={128}
            alt="profile Image"
          />
        )}

        <label className="px-3 py-1.5 cursor-pointer active:scale-90 hover:text-white text-gray-500 border rounded-xl text-xs">
          Edit image
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
        <article className="flex-2 flex flex-col gap-6 px-10">
          <div className="flex justify-between items-center">
            <p className="">{data?.nickname}</p>
            <button
              onClick={modalHandle}
              className="px-3 py-1.5 text-xs cursor-pointer active:scale-90 hover:text-white text-gray-500 border rounded-xl"
            >
              Edit nickname
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>{data?.email}</p>
          </div>
          <ModalLayout showModal={showModal} onClose={modalHandle}>
            <UpdateInfoModal
              onUpdated={async () => {
                await refetch();
              }}
              showModal={showModal}
              onClose={modalHandle}
            />
          </ModalLayout>
        </article>
      )}
    </section>
  );
};
