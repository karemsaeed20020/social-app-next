"use client";

import EmojiPickerReact, { EmojiStyle, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function EmojiPicker({
  onChange,
  children,
  side = "bottom",
  align = "center",
}: EmojiPickerProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        className="p-0 border-none shadow-none w-auto bg-transparent"
      >
        <EmojiPickerReact
          theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={(emojiData) => {
            onChange(emojiData.emoji);
          }}
          lazyLoadEmojis
          emojiStyle={EmojiStyle.FACEBOOK}
        />
      </PopoverContent>
    </Popover>
  );
}
