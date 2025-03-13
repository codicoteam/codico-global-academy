import AddCourse from "@/components/Auth/AddCourse";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is make payment page for Startup Pro"
};

export default function MakePayementPage() {
  return (
    <>
      <AddCourse />
    </>
  );
}
