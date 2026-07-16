import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TrainingPage from "@/components/TrainingPage";
import { courseItems } from "@/data/site";

export default function CourseDetail() {
  const { slug } = useParams();

  const course = courseItems.find((c) => c.slug === slug);

  if (!course) {
    return (
      <Layout>
        <div className="container-x py-32 text-center">
          <h1 className="font-display text-4xl">Course not found</h1>

          <Link to="/" className="btn-primary mt-6 inline-block">
            Go Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <TrainingPage training={course} />
    </Layout>
  );
}