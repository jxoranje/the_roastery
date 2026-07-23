import EditIdeaClient from "./EditIdeaClient";

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <EditIdeaClient id={params.id} />;
}