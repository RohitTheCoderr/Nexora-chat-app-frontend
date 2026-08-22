import { AppLayout } from "@/components/common/app-layout.tsx";
import ProfileCard from "./components/profile-card.tsx";
import ProfileForm from "./components/profile-form.tsx";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "./apis/get-profile/index.ts";
import { useState } from "react";
import { useAuth } from "../sign-in/store/authStore.ts";
import ProfileSkeleton from "./components/profile-skeleton.tsx";

function Profile() {
  const [editing, setEditing] = useState(false);

  const {setUserData} = useAuth();
  
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile-data"],
    queryFn: async () => {
      const response = await getProfileApi();

      if (response.data) {
        setUserData(response.data);
      }

      return response;
    },
  });

  const profileData = profile?.data;

  return (
    <AppLayout title="Profile" subtitle="How you appear across Nexora">
  {!isLoading ? (
        <ProfileSkeleton />
      ) : (
        profileData && (
          <>
            <ProfileCard
              profile={profileData}
              editing={editing}
              handleEdit={() => setEditing((prev) => !prev)}
            />

            {editing && (
              <ProfileForm
                profile={profileData}
                setEditing={setEditing}
              />
            )}
          </>
        )
      )}
    </AppLayout>
  );
}

export default Profile;
