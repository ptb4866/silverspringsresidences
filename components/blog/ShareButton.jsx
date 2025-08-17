"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export default function ShareButton({
  title,
  url,
  description = "",
  image = "",
  variant = "default", // "default" or "compact"
}) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this article: ${title}`);
    const body = encodeURIComponent(
      `I thought you might be interested in this article:\n\n${title}\n\n${description}\n\nRead more: ${url}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${title} - ${description}`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleLinkedInShare = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareOptions = [
    {
      label: "Copy Link",
      icon: isCopied ? <LinkIcon size={16} /> : <Copy size={16} />,
      onClick: handleCopyLink,
      className: isCopied ? "text-green-600" : "",
    },
    {
      label: "Email",
      icon: <Mail size={16} />,
      onClick: handleEmailShare,
    },
    {
      label: "Facebook",
      icon: <Facebook size={16} />,
      onClick: handleFacebookShare,
    },
    {
      label: "Twitter",
      icon: <Twitter size={16} />,
      onClick: handleTwitterShare,
    },
    {
      label: "LinkedIn",
      icon: <Linkedin size={16} />,
      onClick: handleLinkedInShare,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "compact" ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <Share2 size={14} />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Share2 size={16} />
            {isCopied ? "Copied!" : "Share"}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareOptions.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={option.onClick}
            className={`flex items-center gap-2 cursor-pointer ${
              option.className || ""
            }`}
          >
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
