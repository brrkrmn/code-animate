"use client";

import Editor from "@/components/Editor/Editor";
import { toasts } from "@/context/toast/toast.constants";
import { useToastContext } from "@/context/toast/toastProvider";
import { useEffect } from "react";

const TryoutPage = () => {
  const { toast } = useToastContext();

  useEffect(() => {
    toast(toasts.signInReminder);
  }, []);

  return (
    <div className="px-2 tablet:px-4 laptop:px-40 w-full max-w-[1600px] mx-auto">
      <Editor />
    </div>
  );
};

export default TryoutPage;
