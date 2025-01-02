import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
    <div class="w-full">
      <section class="bg-white dark:bg-gray-900">
        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="mr-auto place-self-center lg:col-span-7">
                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Find the role for YOU</h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Browse hundreds of auditions and jobs. Updated everyday.</p>
                <Link to="/register" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-sky-600 text-white border border-gray-300 rounded-lg hover:bg-sky-800">
                    Join Now
                </Link> 
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
            </div>                
        </div>
        </section>

        <div class="flex flex-col w-full items-center mt-12">
            <h4 class="font-bold mb-12">TRUSTED BY LEADING BRANDS</h4>
            <div class="flex flex-row">
                <img class="w-36 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png" />
                <img class="w-36 h-auto mx-28" src="https://loodibee.com/wp-content/uploads/Netflix-logo.png" />
                <img class="w-36 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/1200px-HBO_logo.svg.png" />
            </div>
        </div>

        <div class="flex flex-row w-full mt-12 bg-black justify-evenly">
            <div class="flex flex-col my-10 items-center">
                <img class="w-36 h-auto rounded-full" src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" alt="Rounded avatar" />
                <h4 class="text-white font-bold py-5 text-xl text-wrap">"I can’t believe how fast I booked a job! There are auditions on Backstage I don’t find anywhere else."</h4>
                <h4 class="text-white font-bold text-lg">Jonathan Muney</h4>
            </div>
            <div class="flex flex-col  my-10 items-center">
                <img class="w-36 h-auto rounded-full" src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" alt="Rounded avatar" />
                <h4 class="text-white font-bold py-5 text-xl text-wrap">"It has been a nonstop whirlwind of auditions, callbacks, bookings, and work. I’m never going to stop using Backstage"</h4>
                <h4 class="text-white font-bold text-lg">Jonathan Muney</h4>
            </div>
        </div>
    </div>
    </>
  );
}

export default HomePage;
