import CourseDetailscomp from "@/components/courseDetails/courseDetials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coursedetails - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Sign Up page for Startup Pro"
};

export default function CourseDetails() {
  return (
    <>
      <CourseDetailscomp image={""} title={""} description={""} category={""} duration={""} price={""} level={""} />
    </>
  );
}
