import CaseStudyLayout from "@/components/CaseStudyLayout/CaseStudyLayout";
import caseStudies from "@/components/CaseStudyLayout/data";
import { useRouter } from "next/router";

export default function CaseStudyPage() {
    const router = useRouter();
    const { slug } = router.query;

    if (!slug) return <p className="pt-40 text-center">Loading...</p>;

    const data = caseStudies.find((item) => item.slug === slug as string);

    if (!data) {
        return (
            <div className="pt-40 text-center">
                <h2 className="text-2xl font-bold">Case Study Not Found</h2>
                <p className="text-muted-foreground mt-2">
                    Make sure you have a JSON file for `{slug}`
                </p>
            </div>
        );
    }

    return <CaseStudyLayout data={data} />;
}
