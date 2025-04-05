import { MetadataRoute } from "next";
import { getBlogs } from "./services/apiBlogs";
import { getCourses } from "./services/apiCourses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, courses] = await Promise.all([getBlogs(), getCourses()]);

  const blogEntries = blogs.map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.id}`,
    lastModified: new Date(),
  }));

  const courseEntries = courses.map((course) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}`,
    lastModified: new Date(),
  }));

  const staticPages = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/offer`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      lastModified: new Date(),
    },
  ];

  return [...staticPages, ...blogEntries, ...courseEntries];
}
