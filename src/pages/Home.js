import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="bg-pink-100 py-20 px-4 lg:px-0">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 lg:pr-10">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
              Welcome to LaborEase
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Where Laborers, Employers, and Contractors Connect
            </p>
            <div className="space-x-4 flex flex-wrap">
              <Link
                to="/mazdoor"
                className="bg-pink-500 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
              >
                Mazdoor
              </Link>
              <Link
                to="/employer"
                className="bg-pink-500 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
              >
                Employer
              </Link>
              <Link
                to="/contractor"
                className="bg-pink-500 text-white px-6 py-2 mx-1 my-1 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
              >
                Contractor
              </Link>
            </div>
          </div>
          {/* Right side: Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img
              src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-3 px-3 ">
        <div className="w-full">
          <div className="container mx-auto my-32 flex flex-col items-center gap-16">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="mb-2 text-3xl font-extrabold leading-tight text-dark-grey-900 lg:text-4xl">
                  How LaborEase works?
                </h2>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                  Are you a laborer looking for work, an employer seeking
                  skilled workers, or a contractor searching for opportunities?
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500 transition hover:bg-blue-600 focus:bg-blue-700">
                  <span className="text-base font-bold leading-7 text-white ">
                    1
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="mb-2 text-base font-bold leading-tight text-dark-grey-900">
                    Create your Account
                  </h3>
                  <p className="text-base font-medium leading-7 text-dark-grey-600">
                    Whether you're a laborer, employer, or contractor, we've got
                    tailored options for you{" "}
                  </p>
                </div>
              </div>
              <div className="rotate-90 lg:rotate-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={43}
                  height={42}
                  viewBox="0 0 43 42"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3346_6663)">
                    <path
                      d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                      fill="#68769F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3346_6663">
                      <rect
                        width={42}
                        height={42}
                        fill="white"
                        transform="translate(0.666748)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-blue-500 bg-transparent text-blue-500">
                  <span className="text-base font-bold leading-7">2</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="mb-2 text-base font-bold leading-tight text-dark-grey-900">
                    Setup your Account
                  </h3>
                  <p className="text-base font-medium leading-7 text-dark-grey-600">
                    Choose your role as a laborer, employer, or contractor, and
                    start exploring personalized opportunities
                  </p>
                </div>
              </div>
              <div className="rotate-90 lg:rotate-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={43}
                  height={42}
                  viewBox="0 0 43 42"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3346_6663)">
                    <path
                      d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                      fill="#68769F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3346_6663">
                      <rect
                        width={42}
                        height={42}
                        fill="white"
                        transform="translate(0.666748)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-blue-500 bg-transparent text-blue-500">
                  <span className="text-base font-bold leading-7">3</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="mb-2 text-base font-bold leading-tight text-dark-grey-900">
                    Start Applying with LaborEase
                  </h3>
                  <p className="text-base font-medium leading-7 text-dark-grey-600">
                  Laborers apply for listed jobs, employers post openings, and contractors team up with laborers to apply for jobs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
