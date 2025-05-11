import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-md w-full shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
            <h1 className="text-2xl font-bold mb-2">Processing Payment</h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
