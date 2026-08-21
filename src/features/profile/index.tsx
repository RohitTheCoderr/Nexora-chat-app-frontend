import { AppLayout } from "@/components/common/app-layout.tsx";
import ProfileCard from "./components/profile-card.tsx";
import ProfileForm from "./components/profile-form.tsx";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "./apis/get-profile/index.ts";
import { useState } from "react";
import { useAuth } from "../sign-in/store/authStore.ts";

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

  // update prfile api call

  const profileData = profile?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout title="Profile" subtitle="How you appear across Nexora">
{profileData && (
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
)}
    </AppLayout>
  );
}

export default Profile;
