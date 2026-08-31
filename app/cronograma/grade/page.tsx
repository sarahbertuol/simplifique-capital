import Grade from "@/components/cronograma/Grade";
import { cronograma } from "@/lib/cronograma";

export default function Page() {
  return <Grade posts={cronograma} />;
}
