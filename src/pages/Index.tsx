import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, Clock } from "lucide-react";
import Header from "@/components/Header";
import hudumaLogo from "@/assets/huduma logo.jpeg";
import coatOfArms from "@/assets/coat-of-arms.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-card py-16">
        <div className="absolute inset-0 opacity-5">
          <div className="kenya-stripe h-full" />
        </div>
        <div className="container relative mx-auto flex flex-col items-center gap-6 px-4 text-center">
          <div className="flex items-center gap-6">
            <img src={coatOfArms} alt="Republic of Kenya Coat of Arms" className="h-24 w-auto object-contain" />
            <img src={hudumaLogo} alt="Huduma Kenya" className="h-24 w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            National ID Application
          </h1>
          <p className="max-w-lg text-muted-foreground">
            Apply for your Kenyan National Identity Card online through the official Huduma Kenya
            digital portal. Fast, secure, and convenient.
          </p>
          <Link to="/apply">
            <Button size="lg" className="px-8 text-base font-semibold">
              <FileText className="mr-2 h-5 w-5" /> Start Application
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: FileText,
              title: "Easy Application",
              desc: "Complete your ID application in minutes with our step-by-step guided process.",
            },
            {
              icon: Shield,
              title: "Secure & Verified",
              desc: "Biometric fingerprint scanning and photo capture ensure identity verification.",
            },
            {
              icon: Clock,
              title: "Fast Processing",
              desc: "Track your application status and get notified when your ID is ready.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-border">
              <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="kenya-stripe h-1" />
        <div className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Huduma Kenya — Republic of Kenya. All rights reserved.</p>
          <p className="mt-1">National ID Application Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
