import LinhaDoTempo from "@/components/LinhaDoTempo";
import { cronograma } from "@/lib/cronograma";

export default function Page() {
  return <LinhaDoTempo posts={cronograma} />;
}
