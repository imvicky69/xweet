"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ECOSYSTEM_APPS } from "@/data/ecosystem";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export function EcosystemSwiper() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-terrain">
          Interactive Spotlight · Swipe or Drag
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous app"
            className="h-8 w-8 rounded-full border border-terrain/30 bg-white/70 hover:bg-white hover:border-carbon flex items-center justify-center text-carbon transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next app"
            className="h-8 w-8 rounded-full border border-terrain/30 bg-white/70 hover:bg-white hover:border-carbon flex items-center justify-center text-carbon transition-colors cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        spaceBetween={16}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          1024: { slidesPerView: 3.15 },
        }}
        autoplay={{ delay: 3200, disableOnInteraction: true, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        loop
        className="!pb-10"
      >
        {ECOSYSTEM_APPS.map((app) => (
          <SwiperSlide key={app.id} className="!h-auto">
            <div className="h-full rounded-3xl border border-terrain/30 bg-white/75 hover:bg-white hover:border-carbon p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all shadow-2xs">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-terrain/20 bg-paper p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src={app.iconPath}
                      alt={app.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-paper border border-terrain/25 text-carbon">
                    {app.status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-terrain block">
                    {app.categoryLabel}
                  </span>
                  <h3 className="font-space font-semibold text-xl text-carbon mt-0.5">
                    {app.name}
                  </h3>
                  <p className="text-xs text-carbon/80 leading-relaxed mt-1.5 line-clamp-2">
                    {app.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-terrain/15 flex items-center justify-between gap-2">
                <Link
                  href={`/apps#${app.id}`}
                  className="text-xs font-mono font-semibold text-carbon hover:underline inline-flex items-center gap-1"
                >
                  <span>Specs &amp; Downloads</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                {app.webUrl && (
                  <a
                    href={app.webUrl}
                    target={app.webUrl.startsWith("/") ? undefined : "_blank"}
                    rel={app.webUrl.startsWith("/") ? undefined : "noopener noreferrer"}
                    className="h-7 px-3 rounded-full bg-signal-lime text-carbon text-[11px] font-semibold inline-flex items-center gap-1 hover:bg-[#cbf056]"
                  >
                    <span>Open</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
