import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Container from "./Container";
import Button from "./Button";
import Arrow from "./arrow";
import { BiBorderRadius } from "react-icons/bi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = ["الرئيسية", "الباقات", "التحولات", "الخدمات"];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-xl" : "shadow-none"
      }`}
    >
      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f5ffb8 100%)",
          zIndex: 0,
        }}
      />
      <div
        className="relative z-10"
        style={{
          background: !isScrolled ? "rgba(26, 26, 26, 0.2)" : "transparent",
          backdropFilter: !isScrolled ? "blur(4px)" : "none",
          transition: "background 300ms ease, backdrop-filter 300ms ease",
        }}
      >
        <Container>
          <div className="flex items-center flex-row-reverse lg:flex-row justify-between py-4">
            {/* Logo */}
            <div
              className="text-2xl"
              style={{
                fontFamily: "Bruno Ace SC",
              }}
            >
              <span style={{ color: isScrolled ? "" : "#ffffff" }}>Bo</span>
              <span
                style={{
                  color: isScrolled
                    ? "rgb(178, 202, 60)"
                    : "var(--color-primary)",
                }}
              >
                yka
              </span>
            </div>

            {/* Nav links - desktop */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-medium transition-all duration-300"
                  style={{ color: isScrolled ? "" : "white" }}
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Button - desktop */}
            <div className="hidden lg:block">
              <Button
                text="اشترك الآن"
                leftComponent={
                  <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                }
                className="text-black w-44 py-3.5 font-bold"
              />
            </div>

            {/* Burger icon */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-2xl transition-all duration-300"
              style={{ color: isScrolled ? "" : "white" }}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`
            lg:hidden overflow-hidden transition-all duration-300
            ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
          >
            <nav className="flex flex-col gap-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-medium transition-all duration-300"
                  style={{ color: isScrolled ? "" : "white" }}
                >
                  {link}
                </a>
              ))}

              <Button
                text="اشترك الآن"
                leftComponent={
                  <Arrow backgroundColor={"rgba(255, 255, 255, 0.75)"} />
                }
                className="text-black w-full sm:w-60 py-3.5 font-medium"
                style={{ borderRadius: "0.4rem" }}
              />
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
}
