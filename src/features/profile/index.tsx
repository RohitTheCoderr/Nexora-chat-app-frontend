import { AppLayout } from "@/components/common/app-layout.tsx";
import ProfileCard from "./components/profile-card.tsx";
import ProfileForm from "./components/profile-form.tsx";

function Profile() {
  return (
    <AppLayout>
      <ProfileCard />
      <ProfileForm />
    </AppLayout>
  );
}

export default Profile;
