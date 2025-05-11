"use client"
import { useState, useEffect } from "react";
import { CreditCard, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DashboardHeaderProps {
  credits: number;
}

export default function DashboardHeader({ credits }: DashboardHeaderProps) {
  const isPremium = credits === Number.POSITIVE_INFINITY;
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Animation effect when component loads
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 shadow-sm transition-all duration-300">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className={`transition-all duration-500 ${showAnimation ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Secure Link Generator
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
            Create secure links for your text or files that expire automatically
          </p>
        </div>

        <div className={`transition-all duration-500 delay-150 ${showAnimation ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-6 w-full md:w-auto transition-all hover:shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining Credits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{isPremium ? "∞" : credits}</p>
              </div>
            </div>

            {!isPremium ? (
              <Button 
                asChild 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Link href="/dashboard/billing" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Upgrade
                </Link>
              </Button>
            ) : (
              <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full flex items-center">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-1" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Premium</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}