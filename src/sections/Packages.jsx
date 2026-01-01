import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { usePackages } from "../context/packages-context";
import Container from "../components/Container";
import SectionHead from "../components/SectionHead";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Arrow from "../components/Arrow";
import { IoMdCheckmark } from "react-icons/io";
import { MotionDiv } from "../animations/MotionPresets";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";

export default function Packages({ onSelectPackage, convertToUSD, usdRate }) {
  const { packagesIsLoading, packages, errorFetchingPackages } = usePackages();
  const [selectedMonths, setSelectedMonths] = useState({});
  const [showAll, setShowAll] = useState(false);

  const handleMonthChange = (pkgId, month) => {
    setSelectedMonths((prev) => ({
      ...prev,
      [pkgId]: month,
    }));
  };

  let content;

  if (packagesIsLoading) {
    content = <Loader />;
  } else if (errorFetchingPackages || !packages || packages.length === 0) {
    content = (
      <div className="flex justify-center items-center flex-col">
        <img src="/images/error.png" alt="error" />
        <p className="text-2xl mt-4 font-semibold text-red-600">
          حدث خطأ أثناء جلب البيانات!
        </p>
      </div>
    );
  } else {
    content = (
      <>
        {/* Desktop and Tablet View */}
        <>
          <div className="hidden md:grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-20">
            {packages
              .slice(
                0,
                showAll
                  ? packages.length
                  : typeof window !== "undefined" &&
                    window.matchMedia("(min-width: 1280px)").matches
                  ? 3
                  : 4
              )
              .map((pkg, index) => {
                const selectedMonth = selectedMonths[pkg.id] || 1;

                return (
                  <div
                    key={pkg.id}
                    className="package-box px-5 pt-8 pb-9 rounded-4xl shadow-md transition-transform"
                    style={{
                      border: "1px solid rgba(230, 230, 230, 1)",
                      boxShadow: "0px 4px 100px 0px rgba(0, 0, 0, 0.1)",
                      background: "white",
                    }}
                  >
                    <MotionDiv
                      variant="scaleFade"
                      visibleOverride={{
                        viewport: { once: true, amount: 1 },
                        transition: { duration: 1 },
                      }}
                    >
                      <h2 className="text-3xl font-semibold mb-1.5">
                        {pkg.name}
                      </h2>
                    </MotionDiv>
                    <MotionDiv
                      variant="scaleFade"
                      visibleOverride={{
                        viewport: { once: true, amount: 1 },
                        transition: { duration: 1 },
                      }}
                    >
                      <p
                        style={{ color: "rgba(102, 102, 102, 1)" }}
                        className="text-lg font-normal mb-8"
                      >
                        {pkg.short_description}
                      </p>
                    </MotionDiv>

                    <MotionDiv
                      variant="scaleFade"
                      visibleOverride={{
                        viewport: { once: true, amount: 1 },
                        transition: { duration: 1 },
                      }}
                    >
                      <div className="mb-5">
                        {selectedMonth === 1 && (
                          <div>
                            <div className="flex items-center gap-1 ">
                              <p className="font-bold text-2xl">
                                {pkg.one_month_price_after_discount} جنيه
                              </p>
                              {!usdRate ? (
                                ""
                              ) : (
                                <div className="mt-1 flex items-center gap-1 font-semibold text-xl ">
                                  <span>=</span>
                                  <span>
                                    {convertToUSD(
                                      pkg.one_month_price_after_discount
                                    )}{" "}
                                    دولار
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                              {pkg.one_month_price_before_discount} جنيه
                            </p>
                          </div>
                        )}
                        {selectedMonth === 6 && (
                          <div>
                            <div className="flex items-center gap-1 ">
                              <p className="font-bold text-2xl">
                                {pkg.six_month_price_after_discount} جنيه
                              </p>
                              {!usdRate ? (
                                ""
                              ) : (
                                <div className="mt-1 flex items-center gap-1 font-semibold text-xl ">
                                  <span>=</span>
                                  <span>
                                    {convertToUSD(
                                      pkg.six_month_price_after_discount
                                    )}{" "}
                                    دولار
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                              {pkg.six_month_price_before_discount} جنيه
                            </p>
                          </div>
                        )}
                        {selectedMonth === 12 && (
                          <div>
                            <div className="flex items-center gap-1 ">
                              <p className="font-bold text-2xl">
                                {pkg.twelve_month_price_after_discount} جنيه
                              </p>
                              {!usdRate ? (
                                ""
                              ) : (
                                <div className="mt-1 flex items-center gap-1 font-semibold text-xl ">
                                  <span>=</span>
                                  <span>
                                    {convertToUSD(
                                      pkg.twelve_month_price_after_discount
                                    )}{" "}
                                    دولار
                                  </span>
                                </div>
                              )}
                            </div>
                            <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                              {pkg.twelve_month_price_before_discount} جنيه
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 my-2 mb-12">
                        {[1, 6, 12].map((month) => (
                          <button
                            key={month}
                            className={`pr-4 pl-4.5 pt-0.5 pb-2 rounded-lg ${
                              selectedMonth !== month
                                ? "hover:bg-[#def867b0]"
                                : ""
                            }`}
                            style={{
                              border:
                                selectedMonth !== month
                                  ? "1px solid rgba(204, 204, 204, 1)"
                                  : "",
                              background:
                                selectedMonth === month
                                  ? "var(--color-primary)"
                                  : "",
                              cursor: selectedMonth === month ? "" : "pointer",
                            }}
                            onClick={() => handleMonthChange(pkg.id, month)}
                          >
                            {month === 1
                              ? "شهر"
                              : month === 6
                              ? "6 شهور"
                              : "12 شهر"}
                          </button>
                        ))}
                      </div>
                    </MotionDiv>

                    <MotionDiv
                      variant="slideXRight"
                      visibleOverride={{
                        viewport: { once: true, amount: 1 },
                        transition: { duration: 1 },
                      }}
                    >
                      <Button
                        text="الإشتراك فى الباقة"
                        leftComponent={<Arrow backgroundColor={"white"} />}
                        animateLeft="slide"
                        animationDelay={index * 8}
                        onClick={() => {
                          onSelectPackage({
                            ...pkg,
                            selectedMonth,
                          });
                          window.lenis.scrollTo(0, {
                            duration: 0.5,
                          });
                        }}
                        className="py-4 font-bold w-full text-white text-lg gap-3"
                        style={{ backgroundColor: "black" }}
                      />
                    </MotionDiv>

                    {pkg.descriptions.length !== 0 && (
                      <ul className="space-y-3 mt-10 pl-2">
                        {pkg.descriptions.map((desc, idx) => (
                          <MotionDiv
                            key={idx}
                            variant="scaleFade"
                            visibleOverride={{
                              viewport: { once: true, amount: 0.6 },
                              transition: {
                                duration: 0.6,
                                delay: index * 0.15,
                              },
                            }}
                          >
                            <li className="flex gap-2 items-start">
                              <div
                                className="w-7 h-7 rounded-full shrink-0 flex justify-center items-center mt-0.5 text-xl"
                                style={{
                                  backgroundColor: "var(--color-primary)",
                                  color: "white",
                                }}
                              >
                                <IoMdCheckmark />
                              </div>
                              <span className="font-semibold text-xl">
                                {desc}
                              </span>
                            </li>
                          </MotionDiv>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>

          {((packages.length > 4 &&
            typeof window !== "undefined" &&
            !window.matchMedia("(min-width: 1280px)").matches) ||
            (packages.length > 3 &&
              typeof window !== "undefined" &&
              window.matchMedia("(min-width: 1280px)").matches)) && (
            <div className="hidden md:flex justify-center mt-8">
              <Button
                onClick={() => {
                  setShowAll(!showAll);
                  window.lenis.scrollTo(showAll ? 3700 : 4100, {
                    duration: 0.5,
                  });
                }}
                text={`${showAll ? "عرض أقل" : "عرض الكل"}`}
                leftComponent={
                  showAll ? (
                    <AiOutlineFullscreenExit
                      style={{
                        fontSize: "1.5em",
                      }}
                    />
                  ) : (
                    <AiOutlineFullscreen
                      style={{
                        fontSize: "1.5em",
                      }}
                    />
                  )
                }
                animateLeft="pulse"
                className="text-black w-44 py-4 font-bold "
              />
            </div>
          )}
        </>

        {/* Mobile View with Swiper */}
        <div className="block md:hidden mt-20">
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1.1}
            centeredSlides={false}
            initialSlide={0}
            navigation={{
              nextEl: ".packages-button-prev",
              prevEl: ".packages-button-next",
            }}
            className="packages-swiper"
          >
            {packages.map((pkg, index) => {
              const selectedMonth = selectedMonths[pkg.id] || 1;

              return (
                <SwiperSlide key={pkg.id} className="packages-swiper-slide">
                  <div
                    className="package-box px-5 pt-8 pb-9 rounded-4xl shadow-md transition-all duration-500"
                    style={{
                      border: "1px solid rgba(230, 230, 230, 1)",
                      boxShadow: "0px 4px 100px 0px rgba(0, 0, 0, 0.1)",
                      background: "white",
                    }}
                  >
                    <h2 className="text-3xl font-semibold mb-1.5">
                      {pkg.name}
                    </h2>

                    <p
                      style={{ color: "rgba(102, 102, 102, 1)" }}
                      className="text-lg font-normal mb-8"
                    >
                      {pkg.short_description}
                    </p>

                    <div className="mb-5">
                      {selectedMonth === 1 && (
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-medium 2xs:font-bold text-xl 2xs:text-2xl">
                              {pkg.one_month_price_after_discount} جنيه
                            </p>
                            {!usdRate ? (
                              ""
                            ) : (
                              <div className="mt-1 flex items-center gap-1 font-normal 2xs:font-semibold 2xs:text-xl">
                                <span>=</span>
                                <span>
                                  {convertToUSD(
                                    pkg.one_month_price_after_discount
                                  )}{" "}
                                  دولار
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                            {pkg.one_month_price_before_discount} جنيه
                          </p>
                        </div>
                      )}
                      {selectedMonth === 6 && (
                        <div>
                          <div className="flex items-center gap-1 ">
                            <p className="font-medium 2xs:font-bold text-xl 2xs:text-2xl">
                              {pkg.six_month_price_after_discount} جنيه
                            </p>
                            {!usdRate ? (
                              ""
                            ) : (
                              <div className="mt-1 flex items-center gap-1 font-normal 2xs:font-semibold 2xs:text-xl">
                                <span>=</span>
                                <span>
                                  {convertToUSD(
                                    pkg.six_month_price_after_discount
                                  )}{" "}
                                  دولار
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                            {pkg.six_month_price_before_discount} جنيه
                          </p>
                        </div>
                      )}
                      {selectedMonth === 12 && (
                        <div>
                          <div className="flex items-center gap-1 ">
                            <p className="font-medium 2xs:font-bold text-xl 2xs:text-2xl">
                              {pkg.twelve_month_price_after_discount} جنيه
                            </p>
                            {!usdRate ? (
                              ""
                            ) : (
                              <div className="mt-1 flex items-center gap-1 font-normal 2xs:font-semibold 2xs:text-xl">
                                <span>=</span>
                                <span>
                                  {convertToUSD(
                                    pkg.twelve_month_price_after_discount
                                  )}{" "}
                                  دولار
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                            {pkg.twelve_month_price_before_discount} جنيه
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 my-2 mb-12">
                      {[1, 6, 12].map((month) => (
                        <button
                          key={month}
                          className={`pr-2.5 2xs:pr-4 pl-3 2xs:pl-4.5 pt-0.5 pb-2 rounded-lg ${
                            selectedMonth !== month
                              ? "hover:bg-[#def867b0]"
                              : ""
                          }`}
                          style={{
                            border:
                              selectedMonth !== month
                                ? "1px solid rgba(204, 204, 204, 1)"
                                : "",
                            background:
                              selectedMonth === month
                                ? "var(--color-primary)"
                                : "",
                            cursor: selectedMonth === month ? "" : "pointer",
                          }}
                          onClick={() => handleMonthChange(pkg.id, month)}
                        >
                          {month === 1
                            ? "شهر"
                            : month === 6
                            ? "6 شهور"
                            : "12 شهر"}
                        </button>
                      ))}
                    </div>

                    <Button
                      text="الإشتراك فى الباقة"
                      leftComponent={<Arrow backgroundColor={"white"} />}
                      animateLeft="slide"
                      animationDelay={index * 8}
                      onClick={() => {
                        onSelectPackage({
                          ...pkg,
                          selectedMonth,
                        });
                        window.lenis.scrollTo(0, {
                          duration: 0.5,
                        });
                      }}
                      className="py-4 font-bold w-full text-white 2xs:text-lg gap-3"
                      style={{ backgroundColor: "black" }}
                    />

                    {pkg.descriptions.length !== 0 && (
                      <ul className="space-y-3 mt-10 pl-2">
                        {pkg.descriptions.map((desc) => (
                          <li className="flex gap-2 items-start">
                            <div
                              className="w-7 h-7 rounded-full shrink-0 flex justify-center items-center mt-0.5 text-xl"
                              style={{
                                backgroundColor: "var(--color-primary)",
                                color: "white",
                              }}
                            >
                              <IoMdCheckmark />
                            </div>
                            <span className="font-semibold text-xl">
                              {desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <style jsx global>{`
          .swiper-button-lock {
            display: none !important;
          }

          @media (max-width: 767px) {
            .packages-swiper {
              overflow: visible !important;
            }

            .packages-swiper .swiper-wrapper {
              perspective: 1000px;
            }

            .packages-swiper-slide:not(.swiper-slide-active) > div {
              transform: scale(0.9) translateZ(-50px);
              opacity: 0.6;
              filter: blur(3px);
            }

            .packages-swiper-slide.swiper-slide-active > div {
              transform: scale(1) translateZ(0);
              opacity: 1;
              filter: blur(0);
            }
          }

          .packages-swiper-slide > div {
            transform: scale(1);
            opacity: 1;
            filter: blur(0);
          }
        `}</style>
      </>
    );
  }

  return (
    <div
      id="packages"
      className="pt-14 pb-22 overflow-hidden min-h-130 bg-white"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,.35),
            rgba(255,255,255,.35)
          ),
          linear-gradient(
            to bottom,
            rgba(255,255,255,.45),
            rgba(255,255,255,.2),
            rgba(255,255,255,.05)
          ),
          url('/images/lines.png')
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <SectionHead
          titleColor="rgba(26, 26, 26, 1)"
          titleText="باقات الاشتراك"
          descColor="rgba(96, 96, 96, 1)"
          descText="اختر الباقة المناسبة لهدفك وميزانيتك"
        />
        {content}
      </Container>
    </div>
  );
}

/*import { useState } from "react";
import { usePackages } from "../context/packages-context";
import Container from "../components/Container";
import SectionHead from "../components/SectionHead";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Arrow from "../components/Arrow";
import { IoMdCheckmark } from "react-icons/io";
import Lenis from "@studio-freight/lenis";
import { MotionDiv } from "../animations/MotionPresets";

export default function Packages({ onSelectPackage }) {
  const { packagesIsLoading, packages, errorFetchingPackages } = usePackages();
  const [selectedMonths, setSelectedMonths] = useState({});

  const handleMonthChange = (pkgId, month) => {
    setSelectedMonths((prev) => ({
      ...prev,
      [pkgId]: month,
    }));
  };

  let content;

  if (packagesIsLoading) {
    content = <Loader />;
  } else if (errorFetchingPackages || !packages || packages.length === 0) {
    content = (
      <div className="flex justify-center items-center flex-col">
        <img src="/images/error.png" alt="error" />
        <p className="text-2xl mt-4 font-semibold text-red-600">
          حدث خطأ أثناء جلب البيانات!
        </p>
      </div>
    );
  } else {
    content = (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-20">
        {packages.map((pkg, index) => {
          const isSpecial = index % 3 === 1;
          const selectedMonth = selectedMonths[pkg.id] || 1;

          return (
            <div
              key={pkg.id}
              className={`package-box px-5 pt-8 pb-9 rounded-4xl shadow-md transition-transform`}
              style={{
                border: "1px solid rgba(230, 230, 230, 1)",
                boxShadow: "0px 4px 100px 0px rgba(0, 0, 0, 0.1)",
                background: "white",
              }}
            >
              <MotionDiv
                variant="scaleFade"
                visibleOverride={{
                  viewport: { once: true, amount: 1 },
                  transition: { duration: 1 },
                }}
              >
                <h2 className="text-3xl font-semibold mb-1.5">{pkg.name}</h2>
              </MotionDiv>
              <MotionDiv
                variant="scaleFade"
                visibleOverride={{
                  viewport: { once: true, amount: 1 },
                  transition: { duration: 1 },
                }}
              >
                <p
                  style={{ color: "rgba(102, 102, 102, 1)" }}
                  className="text-lg font-normal mb-8"
                >
                  {pkg.short_description}
                </p>
              </MotionDiv>

              <MotionDiv
                variant="scaleFade"
                visibleOverride={{
                  viewport: { once: true, amount: 1 },
                  transition: { duration: 1 },
                }}
              >
                <div className="mb-5">
                  {selectedMonth === 1 && (
                    <div>
                      <p className="font-bold text-2xl">
                        {pkg.one_month_price_after_discount} جنيه
                      </p>
                      <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                        {pkg.one_month_price_before_discount} جنيه
                      </p>
                    </div>
                  )}
                  {selectedMonth === 6 && (
                    <div>
                      <p className="font-bold text-2xl">
                        {pkg.six_month_price_after_discount} جنيه
                      </p>
                      <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                        {pkg.six_month_price_before_discount} جنيه
                      </p>
                    </div>
                  )}
                  {selectedMonth === 12 && (
                    <div>
                      <p className="font-bold text-2xl">
                        {pkg.twelve_month_price_after_discount} جنيه
                      </p>
                      <p className="line-through text-gray-500 font-semibold text-[0.95rem]">
                        {pkg.twelve_month_price_before_discount} جنيه
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 my-2 mb-12">
                  {[1, 6, 12].map((month) => (
                    <button
                      key={month}
                      className={`pr-4 pl-4.5 pt-0.5 pb-2 rounded-lg ${
                        selectedMonth !== month ? "hover:bg-[#def867b0]" : ""
                      }`}
                      style={{
                        border:
                          selectedMonth !== month
                            ? "1px solid rgba(204, 204, 204, 1)"
                            : "",
                        background:
                          selectedMonth === month ? "var(--color-primary)" : "",
                        cursor: selectedMonth === month ? "" : "pointer",
                      }}
                      onClick={() => handleMonthChange(pkg.id, month)}
                    >
                      {month === 1 ? "شهر" : month === 6 ? "6 شهور" : "12 شهر"}
                    </button>
                  ))}
                </div>
              </MotionDiv>

              <MotionDiv
                variant="slideXRight"
                visibleOverride={{
                  viewport: { once: true, amount: 1 },
                  transition: { duration: 1 },
                }}
              >
                <Button
                  text="الإشتراك فى الباقة"
                  leftComponent={<Arrow backgroundColor={"white"} />}
                  animateLeft="slide"
                  animationDelay={index * 8}
                  onClick={() => {
                    onSelectPackage({
                      ...pkg,
                      selectedMonth,
                    });
                    window.lenis.scrollTo(0, {
                      duration: 0.5,
                    });
                  }}
                  className="py-4 font-bold w-full text-white text-lg gap-3"
                  style={{ backgroundColor: "black" }}
                />
              </MotionDiv>

              {pkg.descriptions.length !== 0 && (
                <ul className="space-y-3 mt-10 pl-2">
                  {pkg.descriptions.map((desc, idx) => (
                    <MotionDiv
                      variant="scaleFade"
                      visibleOverride={{
                        viewport: { once: true, amount: 0.6 },
                        transition: { duration: 0.6, delay: index * 0.15 },
                      }}
                    >
                      <li key={idx} className="flex gap-2 items-start">
                        <div
                          className="w-7 h-7 rounded-full shrink-0 flex justify-center items-center mt-0.5 text-xl"
                          style={{
                            backgroundColor: "var(--color-primary)",
                            color: "white",
                          }}
                        >
                          <IoMdCheckmark />
                        </div>
                        <span className="font-semibold text-xl">{desc}</span>
                      </li>
                    </MotionDiv>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      id="packages"
      className="pt-14 pb-22 overflow-hidden min-h-130 bg-white"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,.35),
            rgba(255,255,255,.35)
          ),
          linear-gradient(
            to bottom,
            rgba(255,255,255,.45),
            rgba(255,255,255,.2),
            rgba(255,255,255,.05)
          ),
          url('/images/lines.png')
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <SectionHead
          titleColor="rgba(26, 26, 26, 1)"
          titleText="باقات الاشتراك"
          descColor="rgba(96, 96, 96, 1)"
          descText="اختر الباقة المناسبة لهدفك وميزانيتك"
        />
        {content}
      </Container>
    </div>
  );
}
*/
