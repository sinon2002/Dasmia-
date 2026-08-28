"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/AppIcon";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function NotFound() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleGoHome = () => {
    router?.push("/");
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history?.back();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">
          {t(language, "404.title")}
        </h2>
        <p className="text-onBackground/70 mb-8">
          {t(language, "404.desc")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            {t(language, "404.back")}
          </button>

          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 border border-border bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <Icon name="HomeIcon" size={16} />
            {t(language, "404.home")}
          </button>
        </div>
      </div>
    </div>
  );
}
