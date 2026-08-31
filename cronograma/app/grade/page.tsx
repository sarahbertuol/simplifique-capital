import Grade from "@/components/Grade";
import { cronograma } from "@/lib/cronograma";

export default function Page() {
  return <Grade posts={cronograma} />;
}
