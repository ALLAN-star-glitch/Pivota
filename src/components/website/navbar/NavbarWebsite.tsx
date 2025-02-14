import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PostAdModal from "@/components/modals/AuthenticatedPostAdModal";
import UnauthenticatedPostAdModal from "@/components/modals/UnauthenticatedPostAdModal";

const NavbarWebsite: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isUnauthenticatedModalOpen, setIsUnauthenticatedModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openAdModal = () => {
    setIsAdModalOpen(true);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleRedirect = () => {
    router.push(`/dashboard`);
  };

  const closeUnauthenticatedModal = () => setIsUnauthenticatedModalOpen(false);  // Close modal

  return (
    <nav className="fixed top-0 w-full bg-white text-pivotaTeal shadow-md z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-between items-center gap-2 text-2xl font-bold cursor-pointer" onClick={() => router.push("/") }>
          <Image src="/mylogo.png" alt="logo" width={50} height={30} />
          Pivota
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <button onClick={() => router.push("/services-providers")} className="hover:text-pivotaGold">
            Services Providers
          </button>
          <button onClick={() => router.push("/jobs")} className="hover:text-pivotaGold">
            Jobs
          </button>
          <button onClick={() => router.push("/houses")} className="hover:text-pivotaGold">
            Houses
          </button>
          <button onClick={() => router.push("/about")} className="hover:text-pivotaGold">
            About
          </button>
          <button onClick={() => router.push("/pricing")} className="hover:text-pivotaGold">
            Pricing
          </button>
        </div>

        {/* Wishlist, Cart, Post Ad & Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Wishlist Button */}
          <button
            className="hover:text-pivotaGold"
            onClick={() => router.push("/wishlist")}
          >
            <FaRegHeart size={24} />
          </button>

          {/* Cart Button */}
          <button
            className="hover:text-pivotaGold"
            onClick={() => router.push("/cart")}
          >
            <FaShoppingCart size={24} />
          </button>

          <button
            className="bg-pivotaGold text-black px-4 py-2 rounded-md hover:bg-pivotaAqua"
            onClick={openAdModal}
          >
            Post Ad
          </button>

          {/* Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
              <FaUserCircle size={40} />
              <span className="font-medium hidden md:flex">User</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={handleRedirect}
                >
                  Dashboard
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={() => router.push("/profile")}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unauthenticated Modal */}
      <UnauthenticatedPostAdModal
        isOpen={isUnauthenticatedModalOpen}
        onClose={closeUnauthenticatedModal}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarWebsite;
