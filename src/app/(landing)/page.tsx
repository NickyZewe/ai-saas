import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <p> landing page (unprotected)</p>
      <div>
        <Link href={"sign-in"}>
          <Button>Log In</Button>
        </Link>
      </div>
      <div>
        <Link href={"sign-up"}>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
