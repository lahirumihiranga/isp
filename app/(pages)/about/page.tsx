import Image from "next/image";
import { Shield, LinkIcon, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen py-16 z-0">
      {/* Hero Section */}
      <section className="z-0 w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Secure Sharing,{" "}
                <span className="text-emerald-500">Simplified</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                We're on a mission to make sharing files and links secure,
                private, and effortless for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 bg-zinc-50 dark:bg-zinc-900">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Sets Us Apart
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Our platform combines cutting-edge security with ease of use
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <Card className="bg-white dark:bg-zinc-800 border-0 shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800/30">
                  <Shield className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">Military-Grade Encryption</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Your data is protected with the highest level of encryption,
                  ensuring only intended recipients can access it.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-zinc-800 border-0 shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800/30">
                  <LinkIcon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">Expiring Links</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Set custom expiration times for your shared links, maintaining
                  control over your data even after sharing.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-zinc-800 border-0 shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-800/30">
                  <Globe className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">Global Access Control</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Manage who can access your shared content with detailed
                  permissions and authentication options.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet Our Team
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                The passionate people behind our secure sharing platform
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
            {[
              {
                name: "Lahiru Mihiranga",
                role: "Founder & CEO",
                bio: "Security expert with 15+ years in data protection and privacy solutions.",
                link: '/images/team/lahiru.jpeg'
              },
              {
                name: "Sam Rivera",
                role: "CTO",
                bio: "Cryptography specialist focused on building scalable, high available secure systems.",
                link: '/'
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center justify-center space-y-4 mx-auto">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={member.link}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="aspect-square object-cover"
                    priority
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-emerald-500 font-medium">
                    {member.role}
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-950/30">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Share Securely?
              </h2>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Join thousands of users who trust our platform for their secure
                sharing needs
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              >
                <Link href="/sign-in">Get Started</Link>{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer">
                <Link href="/pricing">See Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
