"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

import type { ComponentPropsWithoutRef } from "react";

type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

type AvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

type AvatarFallbackProps = ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;

function Avatar({ className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
