
import type { ReactNode } from "react";
import ProfileHeader from "./_components/profileHeader";
import ProfileBottomNav from "./_components/profileBottomNav";



const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return <>
            <div className="min-h-screen bg-muted/30 pb-24 md:pb-12">
            <ProfileHeader/>
              {/*Layout children */}

              {children}
            <ProfileBottomNav/>
            </div>
        </>;
};

export default ProfileLayout;
