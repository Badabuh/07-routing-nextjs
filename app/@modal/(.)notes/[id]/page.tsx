import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getNoteById } from "../../../../lib/api";
import NotePreview from "./page.client";

interface NotesModalProps {
  params: {
    id: string;
  };
}

export default async function NotesModal({ params }: NotesModalProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview id={id} />
    </HydrationBoundary>
  );
}
