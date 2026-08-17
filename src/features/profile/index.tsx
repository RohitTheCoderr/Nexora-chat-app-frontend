import { AppLayout } from "@/components/common/app-layout.tsx";
import ProfileCard from "./components/profile-card.tsx";
import ProfileForm from "./components/profile-form.tsx";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "./apis/get-profile/index.ts";
import { useState } from "react";

function Profile() {
  const [editing, setEditing] = useState(false);
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile-data"],
    queryFn: () => getProfileApi(),
  });

  // update prfile api call

  const profileData = profile?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Profile not found</div>;
  }

  return (
    <AppLayout title="Profile" subtitle="How you appear across Nexora">
      <ProfileCard
        profile={profileData}
        editing={editing}
        handleEdit={() => setEditing((prev) => !prev)}
      />
      {editing && <ProfileForm profile={profileData} setEditing={setEditing} />}
    </AppLayout>
  );
}

export default Profile;
