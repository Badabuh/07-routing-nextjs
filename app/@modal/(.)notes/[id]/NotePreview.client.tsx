"use client";

import { getNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../../../components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };
  const { data: note } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button onClick={onClose} className={css.backBtn}>
                X
              </button>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
