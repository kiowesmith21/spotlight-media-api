import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
    <div class="w-full">
        {/* Hero Image */}
      <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Find the role for YOU</h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Browse hundreds of auditions and jobs. Updated everyday.</p>
                <Link to="/register" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-blue-500 text-white border border-gray-300 rounded-lg hover:bg-blue-800">
                    Join Now
                </Link> 
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
            </div>                
        </div>
        </section>
    {/* Trusted companies */}
        <div class="flex flex-col w-full items-center mt-12">
            <h4 class="font-bold mb-4">TRUSTED BY LEADING BRANDS</h4>
            <div class="flex flex-row">
                <img class="w-36 p-8 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png" />
                <img class="w-36 p-5 h-auto mx-12" src="https://loodibee.com/wp-content/uploads/Netflix-logo.png" />
                <img class="w-36 p-10 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/1200px-HBO_logo.svg.png" />
            </div>
        </div>
    {/* Testimonials */}
        <div class="flex flex-row w-full mt-4 bg-black justify-evenly">
            <div class="flex flex-col w-1/4 p-5 my-10 items-center">
                <img class="w-36 h-auto rounded-full" src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" alt="Rounded avatar" />
                <h4 class="text-white font-bold py-5 text-xl text-wrap">"I can’t believe how fast I booked a job! There are auditions on Backstage I don’t find anywhere else."</h4>
                <h4 class="text-white font-bold text-lg">Jonathan Muney</h4>
            </div>
            <div class="flex flex-col w-1/4 p-5 my-10 items-center">
                <img class="w-36 h-auto rounded-full" src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" alt="Rounded avatar" />
                <h4 class="text-white font-bold py-5 text-xl text-wrap">"It has been a nonstop whirlwind of auditions, callbacks, bookings, and work. I’m never going to stop using Backstage"</h4>
                <h4 class="text-white font-bold text-lg">Jonathan Muney</h4>
            </div>
        </div>
    {/* Featured Jobs */}
        <div class="flex flex-col w-full mt-12 bg-white items-center">
            <h4 class="text-black font-bold text-4xl">
                Featured Jobs
            </h4>
            <div class="flex flex-col md:flex-row mt-8 justify-evenly">
                {/* card 1 */}
                <div class="flex flex-col bg-white border border-gray-200 shadow rounded-3xl p-8 w-1/4 items-start">
                    <Link to="/job-board" class="inline-flex px-1 py-1 text-xs font-xs text-center bg-black text-white rounded-full">
                            New York, NY
                    </Link>
                    <div class="flex flex-col">
                        <Link to="/job-board">
                            <h1 class="text-2xl font-bold my-5 hover:text-blue-500">Untitled Dramedy</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> 
                    </div>
                    <Link to="/job-board" class=" mt-3 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-blue-500 text-white border border-gray-300 rounded-lg hover:bg-blue-800">
                            View
                    </Link>
                </div>
                {/* card 2 */}
                <div class="flex flex-col bg-white border border-gray-200 shadow rounded-3xl p-8 w-1/4 items-start">
                    <Link to="/job-board" class="inline-flex px-1 py-1 text-xs font-xs text-center bg-black text-white rounded-full">
                            New York, NY
                    </Link>
                    <div class="flex flex-col">
                        <Link to="/job-board">
                            <h1 class="text-2xl font-bold my-5 hover:text-blue-500">Untitled Horror</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> 
                    </div>
                    <Link to="/job-board" class=" mt-3 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-blue-500 text-white border border-gray-300 rounded-lg hover:bg-blue-800">
                            View
                    </Link>
                </div>
                {/* Card 3 */}
                <div class="flex flex-col bg-white border border-gray-200 shadow rounded-3xl p-8 w-1/4 items-start">
                    <Link to="/job-board" class="inline-flex px-1 py-1 text-xs font-xs text-center bg-black text-white rounded-full">
                            New York, NY
                    </Link>
                    <div class="flex flex-col">
                        <Link to="/job-board">
                            <h1 class="text-2xl font-bold my-5 hover:text-blue-500">Untitled Action</h1>
                        </Link>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> 
                    </div>
                    <Link to="/job-board" class=" mt-3 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-blue-500 text-white border border-gray-300 rounded-lg hover:bg-blue-800">
                            View
                    </Link>
                </div>
            </div>
            <Link to="/job-board" class=" my-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-blue-500 text-white border border-gray-300 rounded-lg hover:bg-blue-800">
                Find more jobs
            </Link>
        </div>
    </div>
    </>
  );
}

export default HomePage;
