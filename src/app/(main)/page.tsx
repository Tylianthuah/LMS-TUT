"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface featureType {
  title: string;
  description: string;
  icon: string;
}

const featuresSection: featureType[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of courses across various subjects, designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and hands-on projects to reinforce your understanding.",
    icon: "🧩",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your progress with detailed analytics and insights.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description:
      "Connect with fellow learners and get help from our community.",
    icon: "👥",
  },
];

export default function Home() {
  return (
    <div className="">
      <section className="relative py-20">
        <div className="flex flex-col items-center justify-center space-y-5 sm:space-y-6 text-center">
          <Badge variant={"outline"} className="text-sm sm:text-md">
            The Future of Online Education
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="sm:max-w-[700px] max-w-[400px] mx-auto text-sm sm:text-lg text-muted-foreground">
            Join thousands of learners and gain new skills with our expert-led
            courses. Unlock your potential, stay ahead in your career, and enjoy
            interactive, hands-on learning experiences tailored for every level.
          </p>

          <div className="flex sm:flex-row gap-4 mt-8">
            <Link
              href="/"
              className={buttonVariants({
                variant: "default",
                size: "lg",
              })}
            >
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {featuresSection.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <div className="sm:text-3xl text-2xl">{feature.icon}</div>
                <h1 className="mt-6 text-xl">{feature.title}</h1>
              </CardTitle>
            </CardHeader>
            <CardDescription className="py-2">
              <p className="text-sm text-muted-foreground px-5">
                {feature.description}
              </p>
            </CardDescription>
          </Card>
        ))}
      </section>
    </div>
  );
}
