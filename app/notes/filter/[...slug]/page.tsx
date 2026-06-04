import { NoteTag } from "@/types/note";
import { fetchNotes } from "../../../../lib/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "@/components/Notes/Notes.client";

interface NotesFilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const { slug } = await params;
  const tag = slug[0] as NoteTag; // Assuming the first segment is the tag
  const queryClient = new QueryClient();
  // Prefetch notes by tag
  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag, page: 1, perPage: 12 }],
    queryFn: () => fetchNotes({ search: "", tag, page: 1, perPage: 12 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
