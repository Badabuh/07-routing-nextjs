import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const queryClient = new QueryClient();
  // Prefetch the first page with empty search by default
  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, perPage: 12 }],
    queryFn: () => fetchNotes({ search: "", page: 1, perPage: 12 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
