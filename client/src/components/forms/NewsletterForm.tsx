import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력하세요.")
    .email("유효한 이메일이 아닙니다."),
});

type FormValues = z.infer<typeof schema>;

function NewsletterForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    setSubmitted(values.email);
    form.reset();
  });

  return (
    <div className="w-full max-w-md space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        <div className="text-base font-semibold">이메일 업데이트 구독</div>
      </div>
      <p className="text-sm text-muted-foreground">
        셋업 관련 소식을 이메일로 받아보세요.
      </p>
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="space-y-1">
          <Input placeholder="you@example.com" {...form.register("email")} />
          {form.formState.errors.email ? (
            <span className="text-xs text-destructive">
              {form.formState.errors.email.message}
            </span>
          ) : null}
        </div>
        <Button className="w-full" type="submit">
          구독하기
        </Button>
      </form>
      {submitted ? (
        <div className="rounded-md border border-secondary bg-secondary/40 p-2 text-xs text-secondary-foreground">
          {submitted} 주소로 안내를 전송했습니다.
        </div>
      ) : null}
    </div>
  );
}

export default NewsletterForm;
