"use client";
import React from "react";
import { BadgeDollarSign, Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Component() {
  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-950/80">
        <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="material-symbols-outlined text-primary-500 text-3xl font-bold text-blue-800">
              CROEX
            </span>
            <BadgeDollarSign className="text-blue-800" size={50} />
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2" aria-label="Toggle menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px] px-4">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#"
                  className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  );
}
