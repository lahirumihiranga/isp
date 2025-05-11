"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { upgradeUserToPremium } from "@/app/actions/user-actions";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const userId = searchParams.get("userId");

    if (!userId) {
      toast("User ID not found. Please contact support.");
      return;
    }

    const processPayment = async () => {
      try {
        // Process the payment upgrade
        await upgradeUserToPremium(userId);
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
        toast("Error processing payment");
      }
    };

    processPayment();
  }, [searchParams, toast]);

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-md w-full shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center p-6">
            {isProcessing ? (
              <>
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                <h1 className="text-2xl font-bold mb-2">Processing Payment</h1>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment...
                </p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-green-100 p-3 mb-4 dark:bg-green-900/30">
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-muted-foreground mb-6">
                  Your account has been upgraded to the Pro plan.
                </p>
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => router.push("/dashboard/generate-link")}
                >
                  Generate Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
