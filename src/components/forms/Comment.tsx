"use client";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CommentValidation } from "@/lib/validations/thead";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/threads/addCommentToThread.action";

type CommentProps = {
  threadId: string;
  currentUserImg: string;
  currentUser: string;
};

function Comment(props: CommentProps) {
  const { threadId, currentUserImg, currentUser } = props;
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof CommentValidation>) {
    addCommentToThread(threadId, values.thread, JSON.parse(currentUser), pathname);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="border-none bg-transparent text-light-1"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
