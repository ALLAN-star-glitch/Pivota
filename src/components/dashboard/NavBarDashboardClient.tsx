'use client';

import { FaPlusCircle } from 'react-icons/fa'; // Icon for "Post an Ad"
import Image from 'next/image';
import { useSession } from 'next-auth/react'; // Importing useSession from next-auth

const NavBarDashboardClient = () => {
  // Fetch the session using next-auth
  const { data: session } = useSession();

  if (!session) {
    // If there's no session (user not authenticated), we could redirect or show nothing
    return null; 
  }

  // Extracting user data from session
  const { firstName, plan } = session.user || {};

  return (
    <>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* Post an Ad Button */}
        <button className="flex items-center bg-pivotaGold text-black px-4 py-2 rounded-md hover:bg-pivotaAqua hidden md:flex">
          <FaPlusCircle size={20} className="mr-2" />
          Post an Ad
        </button>

        {/* Message Icon */}
        <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-pivotaTeal hover:bg-opacity-10">
          <Image src="/message.png" alt="message" width={20} height={20} />
        </div>

        {/* Announcement Icon with Badge */}
        <div className="bg-pivotaWhite rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-pivotaTeal hover:bg-opacity-10">
          <Image src="/announcement.png" alt="announcement" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-pivotaGold text-pivotaWhite rounded-full text-sm">
            1
          </div>
        </div>

        {/* User Info */}
        <div className="hidden md:flex flex-col">
          <span className="text-sm leading-3 font-medium text-pivotaTeal capitalize">{firstName}</span>
          <span className="text-[12px] text-pivotaTeal text-right">{plan}</span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-pivotaTeal mr-3">
          <Image src="/allan.jpg" alt="avatar" width={36} height={36} className="object-cover" />
        </div>

        {/* Floating Action Button for small screens */}
        <div className="fixed bottom-20 right-10 md:hidden flex items-center justify-center space-x-2 z-50">
          {/* Text next to the FAB */}
          <span className="text-pivotaTeal font-medium text-sm">Post Ad</span>

          {/* FAB with pulsating animation */}
          <button className="bg-pivotaTeal text-white p-4 rounded-full shadow-lg hover:bg-pivotaAqua pulsate">
            <FaPlusCircle size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBarDashboardClient;
