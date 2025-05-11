import { createCheckout } from "@/app/actions/payment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/ui/checkout-button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Check, ZapIcon } from "lucide-react";
import { db } from "@/lib/config/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function PricingPage() {
  const clerkUser = await currentUser();

  const res = await db.user.findFirst({
    where: {
      id: clerkUser?.id,
    },
  });

  return (
    <div className="container mx-auto px-4 md:py-24 z-0">
      <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16 mt-12 z-0">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl z-0">
          Simple, transparent pricing ✨
        </h1>
        <p className="mt-4 text-xl text-muted-foreground z-0">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>
      </div>
      <section>
        <div className="mx-auto max-w-5xl px-6">
          <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
            <div className="rounded-(--radius) flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-4">
                    <h2 className="font-medium">Free</h2>
                    {res?.plan === "FREE" && (
                      <Badge>
                        <ZapIcon
                          className="-ms-0.5 opacity-60"
                          size={12}
                          aria-hidden="true"
                        />
                        Current Plan
                      </Badge>
                    )}
                  </div>

                  <span className="my-3 block text-2xl font-semibold">
                    $0 / mo
                  </span>
                  <p className="text-muted-foreground text-sm">Per editor</p>
                </div>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer w-full"
                    >
                      Get Started
                    </Button>
                  </SignInButton>
                </SignedOut>

                <hr className="border-dashed" />

                <ul className="list-outside space-y-3 text-sm">
                  {[
                    "Basic Analytics Dashboard",
                    "5GB Cloud Storage",
                    "Email and Chat Support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-4">
                      <h2 className="font-medium">Pro</h2>
                      {res?.plan === "LIFETIME" && (
                        <Badge>
                          <ZapIcon
                            className="-ms-0.5 opacity-60"
                            size={12}
                            aria-hidden="true"
                          />
                          Current Plan
                        </Badge>
                      )}
                    </div>
                    <span className="my-3 block text-2xl font-semibold">
                      $19 Lifetime
                    </span>
                    <p className="text-muted-foreground text-sm">Per editor</p>
                  </div>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="cursor-pointer w-full">
                        Get Started
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <CheckoutButton createCheckout={createCheckout} />
                  </SignedIn>
                </div>

                <div>
                  <div className="text-sm font-medium">
                    Everything in free plus :
                  </div>

                  <ul className="mt-4 list-outside space-y-3 text-sm">
                    {[
                      "Everything in Free Plan",
                      "5GB Cloud Storage",
                      "Email and Chat Support",
                      "Access to Community Forum",
                      "Single User Access",
                      "Access to Basic Templates",
                      "Mobile App Access",
                      "1 Custom Report Per Month",
                      "Monthly Product Updates",
                      "Standard Security Features",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="size-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
