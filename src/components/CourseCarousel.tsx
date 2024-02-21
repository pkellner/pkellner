// CourseCarousel.tsx
import React, { useEffect } from "react";

const courses = [
  {
    title: "What is React",
    link: "pluralsight.pxf.io/2r6ORa",
    slug: "what-is-react",
    short:
      "Learn what React is and help you understand why React is the number one JavaScript library for building JavaScript apps in a browser.",
    long: "React is the number one JavaScript library for building JavaScript apps in a browser. In this course, What Is React?, you’ll learn all about the component-based nature of React and how that translates into highly performant and easy to use web applications. First, you’ll explore the nature of React and how it addresses building component-based web apps. Next, you’ll discover how React is based on a virtual DOM that efficiently maintains an application's user interface to mirror that virtual DOM. Finally, you’ll learn how React uses the powerful JSX syntax to represent components and the actual UI of a running web app. When you’re finished with this course, you’ll have an excellent understanding of why React is the most popular JavaScript library for building web apps, as well as what it takes to build a React app.",
  },
  {
    title: "React 18 Components",
    link: "pluralsight.pxf.io/GmB2a2",
    slug: "react-18-working-components",
    short:
      "Learn you how to build React apps that use components in the best possible way while minimizing computer resources and maximizing browser UI experience.",
    long: "Creating UIs in React is all about creating independent components that seamlessly work together to present a consistent view across your React web app. In this course, Working with Components in React 18, you will gain the ability to architect and build high quality react apps. First, you will explore the various primitive methods for sharing props and state between components, as well as sharing data more globally with the Context API. Next, you’ll learn how to best handle errors in React components to make sure your users continue to have a great experience with your apps. Finally, you will discover how you can improve your app performance through minimizing over-rendering and other UI improvements. When you are finished with this course, you will have the skills and knowledge of React component design needed to leverage re-usability and ensure consistency in your apps and code with fewer bugs.",
  },
  {
    title: "React 18 Hooks",
    link: "pluralsight.pxf.io/g1K49X",
    slug: "react-18-using-hooks",
    short:
      "This course will teach you how to best use React Hooks, how to build your own Hooks, and how to combine Hooks together to make awesome React apps.",
    long: "Learn everything you need to use React Hooks in your React apps, as well as how to build your own custom Hooks to satisfy your own state and component lifecycle management. In this course, Using Hooks in React 18, you’ll learn to use React Hooks in your function components as well as understand the motivation behind hooks. First, you’ll explore what a React Hook actually is by building your own useState Hook from scratch. Next, you’ll discover the built-in React Hooks provided by the React Facebook team. Finally, you’ll learn how to combine the built-in Hooks and Hooks you build yourself, as well as third-party Hooks into real world React apps. When you’re finished with this course, you’ll have the skills and knowledge of React Hooks needed to build highly performant, easily maintainable React apps that provide an awesome user experience to your end users.",
  },
  {
    title: "React Server Component Fundamentals",
    link: "pluralsight.pxf.io/m5aYj1",
    slug: "react-18-server-component-fundamentals",
    short:
      "Learn how React Server Components can improve the quality of your React apps and architecture.",
    long: "Good app design means fewer bugs, lower maintenance costs, and happier users. In this course, Server Component Fundamentals in React 18, you’ll learn about React Server Components and how you can use them to provide a better user experience. First, you’ll dive into the technology behind server components so that using them makes sense. Next, you’ll explore how to build Server Components that work with async data sources. Finally, you’ll learn how to incorporate Server Components in a real-world app so that your apps provide great browser user experiences and are easy to build. When you’re finished with this course, you’ll have all the knowledge and tools necessary to build apps with React Server and Client Components that provide excellent and performant UIs for your users.",
  },
  {
    title: "Working with Data in React",
    link: "pluralsight.pxf.io/QyrWB6",
    slug: "react-working-data",
    short:
      "Learn how to construct React apps adept at managing all data seamlessly. You'll also learn about the React concurrent rendering feature, Suspense, which enables superior user experiences.",
    long: "React applications running in browsers often need to retrieve remote data, which could be from databases, web servers, or other sources. Understanding the best methods for incorporating this data into your production application is crucial. In the course Working with Data in React, you will explore how to leverage React's latest concurrent rendering features. First, you'll explore Server Components and Server Actions to establish a data connection. Then, you will see best practices that facilitate development and maintenance and enable outstanding user interfaces. Finally, you will learn to provide performant experiences for users of your browser applications. By the end of this course, you will be able to ensure that your applications adhere to the highest standards.",
  },
];

export default function CourseCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextSlide = () =>
    setActiveIndex(current => (current + 1) % courses.length);
  const prevSlide = () =>
    setActiveIndex(current => (current - 1 + courses.length) % courses.length);



  return (
    <div className="relative w-full overflow-hidden">
      {" "}
      {/* Ensure overflow is hidden */}
      <div
        className="flex transition-transform duration-300 ease-linear"
        style={{
          width: `${courses.length * 100}%`,
          transform: `translateX(-${(activeIndex * 100) / courses.length}%)`,
        }}
      >
        {courses.map((course, index) => {
          const str = `https://${course.link}`;
          return (
            <div
              key={index}
              className="w-full flex-none" // Make sure each slide is flex-none and takes full width of the carousel viewport
              style={{width: `${100 / courses.length}%`}}
            >
              {" "}
              {/* Adjust each slide's width */}
              <a href={str} target="_blank" rel="noreferrer">
                <img
                  src={`/courseimages/${course.slug}.png`} // Updated image source
                  alt={course.title}
                  className="h-80 w-full object-contain" // Set a fixed height for images and make them contain within that height
                  style={{objectFit: "contain", objectPosition: "center"}} // Ensures image fits nicely
                />
              </a>
            </div>
          );
        })}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform bg-gray-800 p-2 text-white"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform bg-gray-800 p-2 text-white"
      >
        Next
      </button>
    </div>
  );
}
