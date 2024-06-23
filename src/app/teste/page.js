"use client";

import AccountActivatedModal from "@/components/modal/AccountActivatedModal";
import DeactivateAccountModal from "@/components/modal/DeactivateAccountModal";
import UpdateEmailDataModal from "@/components/modal/UpdateEmailDataModal";




export default function TestPage() {
  return (
    <div className="flex mb-96  w-screen h-screen justify-center items-center">
     <UpdateEmailDataModal />
    </div>
  );
}
