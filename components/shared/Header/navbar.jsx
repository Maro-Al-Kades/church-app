"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, ChurchLogo } from "@/components/icons";
import { IoMdLogIn, IoMdPersonAdd } from "react-icons/io";
import UserProfileIcon from "./UserProfileIcon";
import { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { useSelector } from "react-redux";

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  // Use useMemo to avoid adding the admin nav item multiple times
  const navItems = useMemo(() => {
    const items = [...siteConfig.navItems];
    if (user?.isAdmin) {
      items.push({
        label: "ادارة الموقع",
        href: "/admin",
      });
    }
    return items;
  }, [user]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      maxWidth="2xl"
      position="sticky"
      data-aos="fade-down"
      data-aos-duration="2000"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/"
            passHref
          >
            <ChurchLogo />
            <p className="font-bold text-inherit text-primary text-xl">
              مهرجان الكرازة
            </p>
          </NextLink>
        </NavbarBrand>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex gap-10 justify-start ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink href={item.href} passHref legacyBehavior>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                >
                  {item.label}
                  {item.icon}
                </Link>
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {user ? (
          <UserProfileIcon user={user} />
        ) : (
          <NavbarItem className="hidden md:flex md:gap-3">
            <NextLink href="/auth/register" passHref legacyBehavior>
              <Button
                as="a"
                className="text-sm font-normal text-default-600"
                endContent={<IoMdPersonAdd size={20} />}
                variant="bordered"
                color="primary"
              >
                تسجيل حساب جديد
              </Button>
            </NextLink>
            <NextLink href="/auth/login" passHref legacyBehavior>
              <Button
                as="a"
                className="text-sm font-normal text-default-600"
                endContent={<IoMdLogIn size={20} />}
                variant="flat"
                color="secondary"
              >
                تسجيل الدخول
              </Button>
            </NextLink>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
