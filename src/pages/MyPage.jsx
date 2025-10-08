import profile from "../assets/profile.png";
import { useSupabase } from "../context/AuthProvider";
import { useProfile } from "../features/profiles/useProfile";

export const MyPage = () => {
  const { session } = useSupabase();
  const { data } = useProfile(session?.user?.id);

  return (
    <section className="flex flex-col w-full h-full">
      <article className="flex flex-col justify-center items-center">
        <img
          className="bg-white rounded-full"
          src={profile}
          width={120}
          alt="profile Image"
        />
        {data && (
          <div className="flex flex-col justify-center items-center gap-1 p-1">
            <p title="nickname">{data?.nickname}</p>
            <p title="email">{data?.email}</p>
          </div>
        )}
      </article>
    </section>
  );
};
