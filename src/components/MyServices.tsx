import React, { useState } from "react";

export default function MyServices() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="mb-4 text-2xl font-bold text-center">Coaching Services Offered  {"     "}

      <a href="mailto:peterkellnerblog@svcc.zendesk.com"
         className="group inline-block hover:text-skin-accent link-button astro-upu6fzxr"
         title="Send an email to Peter Kellner's Blog"
         data-astro-source-file="/Users/peterkellner/repos/pkellner-blog-astro/pkellner-blog-astropaper/src/components/LinkButton.astro"
         data-astro-source-loc="29:6">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <polyline points="3 7 12 13 21 7"></polyline>
        </svg>
        <span className="sr-only astro-upu6fzxr"
              data-astro-source-file="/Users/peterkellner/repos/pkellner-blog-astro/pkellner-blog-astropaper/src/components/Socials.astro"
              data-astro-source-loc="22:31">Send an email to Peter Kellner's Blog</span> </a></h2>

      <ul className="mb-4 list-inside list-disc space-y-2 text">
        <li>
          <strong>Targeted Teaching Sessions:</strong> Customized learning
          sessions on JavaScript and React.
        </li>
        <li>
          <strong>Personalized Code Reviews:</strong> Feedback to enhance code
          efficiency, readability, and maintainability.
        </li>
        <li>
          <strong>Expert Architectural Guidance:</strong> Insights into complex
          decisions in JavaScript and React projects.
        </li>
      </ul>
      <div className="flex justify-center">
      <button
        onClick={toggleDetails}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-700 mt-4"
      >
        {showDetails ? "Read Less" : "Read More"}
      </button>
      {showDetails && (
        <p className="mt-4 ml-4">With direct access to an experienced professional like myself,
          specializing in both JavaScript and React, I'll guide you through
          every step of your learning journey. Whether your goal is to master
          coding techniques, unravel advanced concepts, or overcome
          architectural hurdles, my tailored approach ensures you receive the
          focused advice and insights necessary to fast-track your development
          skills. Join me for a custom coaching experience that will
          fundamentally elevate your proficiency in JavaScript and React.
        </p>
      )}
      </div>
    </div>
  );
}
