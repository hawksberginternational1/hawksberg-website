import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import IsoTrainingPage from "@/components/IsoTrainingPage";
// import { isoTrainings } from "@/data/site";
import { isoTrainingItems } from "@/data/site";

export default function IsoTrainingDetail() {
  const { slug } = useParams();
  // const training = isoTrainings.find((t) => t.slug === slug);
  const training = isoTrainingItems.find((t) => t.slug === slug);
  if (!training) {
    return (
      <Layout>
        <div className="container-x py-32 text-center">
          <h1 className="font-display text-4xl">Training not found</h1>
          <Link to="/" className="btn-primary mt-6 inline-block">
            Go home
          </Link>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <IsoTrainingPage training={training} />
    </Layout>
  );
}
