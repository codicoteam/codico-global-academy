"use client";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";

const Pricing = () => {
  return (
    <>
      {/* <!-- ===== Pricing Table Start ===== --> */}
      <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: `CODICO GLOBAL ACADEMY PLANS`,
                subtitle: `Pricing`,
                description: `Unlock your Learnig Potential. Choose a Plan that Fits Your Goals.`,
              }}
            />
          </div>
          {/* <!-- Section Title End --> */}
        </div>

        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute -bottom-15 -z-1 h-full w-full">
            <Image
              fill
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
            {/* <!-- Pricing Item --> */}

            <div className="animate_top group relative flex flex-col items-center rounded-lg border border-stroke bg-white p-7.5 text-center shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                Free Plan
              </h3>
              <span className="mb-5 text-regular text-waterloo dark:text-manatee">
                Perfect for beginners who want to explore coding and learn the
                fundamentals for Free
              </span>
              <button
                className="font-small max-w-xs transform rounded-[25px] bg-blue-500 p-2 text-center text-base text-white 
                  transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
              >
                Start for free
              </button>

              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Free Courses
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Kanban Board
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Analytics
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Certificate of Completion
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Free IntelliJ IDEA Ultimate
                  </li>
                </ul>
              </div>

              <button
                aria-label="Get the Plan button"
                className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
              >
                <span className="duration-300 group-hover/btn:pr-2">
                  Get the Plan
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Pricing Item --> */}

            <div className="relative mt-9 rounded-lg border-t border-stroke bg-blue-100 p-7.5 pb-12.5 pt-9 dark:border-strokedark dark:bg-blue-900">
              <div className="absolute -right-3.5 top-7.5 -rotate-90 rounded-bl-full rounded-tl-full bg-primary px-4.5 py-1.5 text-metatitle font-medium uppercase text-white">
                popular
              </div>

              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                Pro Plan{" "}
              </h3>

              <h6 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                $39.99{" "}
                <span className="text-regular text-waterloo dark:text-manatee">
                  /month
                </span>
              </h6>

              <p className="text-center">
                Access unlimited courses and more to advance your coding skills.
              </p>

              <div className="flex justify-center">
                <Link href="http://localhost:3000/courses">
                  <button
                    className="font-small max-w-xs transform rounded-[25px] bg-blue-500 p-2 text-center text-base text-white 
    transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
                  >
                    Unlock Full Access
                  </button>
                </Link>
              </div>

              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Access to Premium Courses
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Access To All Builds
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Unlimited Kanban Boards
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Certificate of Completion
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Access To All TextBooks
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Code Reviews
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Access To Private Exclusive Community
                  </li>

                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    6 Month Free IntelliJ IDEA Ultimate
                  </li>
                </ul>
              </div>

              <button
                aria-label="Get the Plan button"
                className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
              >
                <span className="duration-300 group-hover/btn:pr-2">
                  Get the Plan
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Pricing Item --> */}
            <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
              <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                Business Plan
              </h3>

              <p className="text-center">
                For teams seeking unlimited courses, builds, and tools to
                enhance skills..
              </p>

              {/* Button wrapper to center align both buttons */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  className="font-small max-w-xs transform rounded-[25px] bg-blue-500 p-2 text-center text-base text-white 
      transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
                >
                  Get Now
                </button>
              </div>

              <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                <ul>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Access to all Courses
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Team Management
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Customized Dashboard
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Branded Certificates
                  </li>
                  <li className="mb-4 flex items-center text-black last:mb-0 dark:text-manatee">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      ✓
                    </span>
                    Dedicated Support
                  </li>

                  <button
                    aria-label="Get the Plan button"
                    className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
                  >
                    <span className="duration-300 group-hover/btn:pr-2">
                      Get the Plan
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Pricing Table End ===== --> */}
    </>
  );
};

export default Pricing;
