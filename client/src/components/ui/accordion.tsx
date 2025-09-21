import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ComponentPropsWithoutRef } from "react";

const Accordion = AccordionPrimitive.Root;

type AccordionItemProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>;

type AccordionTriggerProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;

type AccordionContentProps = ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
