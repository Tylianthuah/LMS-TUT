"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseFormData, courseSchema } from "@/lib/zodSchema";
import { ArrowLeft, SparkleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";

const CreateCoursePage = () => {
  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      duration: 1,
      price: 1,
      level: "Beginner",
      category: "",
      smallDescription: "",
      slug: "",
      status: "Draft",
    },
  });

  function onSubmit(data: CourseFormData) {}

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/admin/courses"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Provide the basic information for your course.
          </CardDescription>
        </CardHeader>
        {/* Form goes here */}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter course title"
                        type="text"
                        className="placeholder:text-neutral-500 placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Slug</FormLabel>
                    <div className="flex items-end gap-5">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter or generate slug"
                          type="text"
                          className="placeholder:text-neutral-500 placeholder:text-xs"
                        />
                      </FormControl>

                      <Button
                        type="button"
                        className="w-fit"
                        onClick={() => {
                          const title = form.getValues("title");
                          const slug = slugify(title);
                          form.setValue("slug", slug, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        Generate Slug <SparkleIcon size={16} />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smallDescription"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="enter a small description"
                        className="min-w-[120px] placeholder:text-neutral-500 placeholder:text-xs"
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateCoursePage;
