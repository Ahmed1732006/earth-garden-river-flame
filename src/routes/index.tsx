import { createFileRoute } from "@tanstack/react-router";
import { Campaign } from "@/components/campaign";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Campaign />;
}
