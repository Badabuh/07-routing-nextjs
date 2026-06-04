"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import { NoteTag } from "@/types/note";
import NoteList from "../../../../components/NoteList/NoteList";

interface NotesFilterPageClientProps {
  tag: NoteTag;
}

export default function NotesFilterPageClient({
  tag,
}: NotesFilterPageClientProps) {
  const { data } = useQuery({
    queryKey: ["notes", { search: "", tag, page: 1, perPage: 12 }],
    queryFn: () => fetchNotes({ search: "", tag, page: 1, perPage: 12 }),
  });
  return <>{data && <NoteList notes={data.notes} />}</>;
}
