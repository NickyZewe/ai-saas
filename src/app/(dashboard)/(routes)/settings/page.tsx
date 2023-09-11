import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { CheckSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

export default async function SettingsPage() {
  const isPro = await CheckSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage Account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="pc-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are a Pro user." : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
}
