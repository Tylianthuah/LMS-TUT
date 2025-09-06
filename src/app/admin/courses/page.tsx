import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CoursePage = () => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link
          href="/admin/courses/create"
          className={buttonVariants({
            variant: "default",
            size: "sm",
          })}
        >
          Create Course
        </Link>
      </div>

      {/* cards */}
      <div>
        <h1>Display a bunch of cards here</h1>
        <p>Each card represents a course with details and actions.</p>
      </div>
    </div>
  );
};

export default CoursePage;
