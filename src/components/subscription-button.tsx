"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export default function SubscriptionButton({
  isPro = false,
}: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error, "[BILLING_ERROR]");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "default" : "upgrade"}
      onClick={onClick}
      disabled={loading}
    >
      {isPro ? "Manage subscription" : "Upgrade"}
      {!isPro && <Zap className="ml-2 w-4 h-4 fill-white" />}
    </Button>
  );
}
