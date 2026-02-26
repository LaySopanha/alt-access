// Video metadata for Vimeo gallery
export type Video = {
  slug: string;
  vimeoId: string;
  title: string;
  titleKh: string;
  description: string;
  thumbnail: string;
  seoTitle: string;
  seoDescription: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      headingKh?: string;
      body: string;
      bullets?: string[];
    }[];
  };
};

export const videos: Video[] = [
  {
    slug: "how-visually-impaired-use-technology",
    vimeoId: "1168414422",
    title: "How Do Blind People See?",
    titleKh: "តើអ្នកមានពិការភាពភ្នែកប្រើប្រាស់បច្ចេកវិទ្យាយ៉ាងមិចទៅ?",
    description: "Exploring how users with low vision, color blindness, and total blindness experience the internet using screen readers.",
    thumbnail: "https://vumbnail.com/1168414422.jpg",
    seoTitle: "How Visually Impaired People Use the Web | AltAccess",
    seoDescription: "Discover how users with low vision, color blindness, and total blindness experience the internet using screen readers, and learn why web accessibility matters.",
    content: {
      intro: "We search for information every day on screens that look perfectly clear to us. But for millions of users with visual impairments, the internet looks vastly different. Web accessibility is not just about design; it is about ensuring everyone has equal access to digital information.",
      sections: [
        {
          heading: "Experiencing the Web Through Different Eyes",
          headingKh: "បទពិសោធន៍នៃការប្រើប្រាស់អ៊ីនធឺណិត",
          body: "In this video, we explore the digital barriers faced by people with different visual conditions:",
          bullets: [
            "Low Vision: Screens can appear heavily blurred, or content may only be visible through a tiny, restricted field of view.",
            "Color Blindness: Using color alone as a navigational signal is often not enough to distinguish buttons, links, or alerts.",
            "Total Blindness: Beautiful UI/UX design disappears completely. All that remains is raw \"data\" and \"sound\" delivered through Screen Reader software."
          ]
        },
        {
          heading: "Why Accessible Web Development Matters",
          headingKh: "ហេតុអ្វីការសរសេរកូដដោយគិតពី Accessibility មានសារៈសំខាន់?",
          body: "If developers write code only for visual beauty without considering digital accessibility (a11y), millions of people are unintentionally left behind. Technology is created to improve human life—it should never become a barrier. Let's build inclusive digital platforms together."
        }
      ]
    }
  },
  {
    slug: "what-is-accessibility",
    vimeoId: "1168414687",
    title: "What is Accessibility?",
    titleKh: "តើ Accessibility ហ្នឹងជាអីគេទៅ?",
    description: "An introduction to accessibility and why it matters for everyone. Did you know 16% of the global population lives with a disability?",
    thumbnail: "https://vumbnail.com/1168414687.jpg",
    seoTitle: "What is Web Accessibility? A Guide for Developers | AltAccess",
    seoDescription: "Did you know 16% of the global population lives with a disability? Learn what web accessibility is and 2 simple steps developers can take today.",
    content: {
      intro: "As a developer, you spend hours building websites and apps to attract as many users as possible. But what if your platform is unintentionally excluding 1.3 billion people? According to the World Health Organization, 16% of the global population lives with some form of disability. That is why developing with digital accessibility in mind is crucial.",
      sections: [
        {
          heading: "Bringing Accessibility to the Digital World",
          body: "In the physical world, accessibility looks like wheelchair ramps or Braille signs. In the IT world, we call this Web Accessibility—creating digital platforms that everyone can use easily. If you are a developer looking to start, here are a few simple steps to implement today:",
          bullets: [
            "Add Alt Text to Images: Always use alt=\"...\" in your HTML to describe images. Without it, Screen Readers cannot tell blind users what the image shows.",
            "Check Color Contrast: Ensure your text and background colors have high contrast. Light gray text on a white background is a massive barrier for users with Low Vision."
          ]
        }
      ]
    }
  },
  {
    slug: "curb-cut-effect",
    vimeoId: "1168414002",
    title: "The Curb Cut Effect",
    titleKh: "តើអ្វីទៅជា Curb Cut Effect?",
    description: "How designing for disabilities—like adding captions or alt text—creates a better user experience for everyone.",
    thumbnail: "https://vumbnail.com/1168414002.jpg",
    seoTitle: "The Curb Cut Effect: How Accessibility Benefits Everyone | AltAccess",
    seoDescription: "What is the Curb Cut Effect? Discover how designing for disabilities—like adding captions or alt text—creates a better user experience for everyone.",
    content: {
      intro: "In the 1970s, activists fought to create \"curb cuts\" (sidewalk ramps) for wheelchair users. While originally designed for a specific group, these ramps ended up helping everyone—people pushing strollers, pulling luggage, or moving heavy carts. This phenomenon is known as the Curb Cut Effect: when we design for disabilities, we make life better for everyone.",
      sections: [
        {
          heading: "The Curb Cut Effect in IT and Web Design",
          body: "Building websites and apps with inclusive design isn't just charity; it is good user experience (UX) for all humanity. Because the truth is, we all experience Situational Disabilities.",
          bullets: [
            "Video Captions: Designed for the deaf, but perfect for users watching videos in a noisy room or a quiet library.",
            "Alt Text: Designed for blind users with Screen Readers, but saves the day for everyone when slow internet prevents images from loading.",
            "High Contrast: Helps visually impaired users, but also helps you read your phone screen under bright sunlight."
          ]
        }
      ]
    }
  },
  {
    slug: "why-developers-should-care",
    vimeoId: "1168415329",
    title: "Why Should We Care?",
    titleKh: "ហេតុអ្វីបានជា Developer គួរខ្វល់ពីការសរសេរកូដ Accessibility?",
    description: "Stand out in the tech industry. Learn why digital accessibility is a rapidly growing market, a legal requirement globally, and a massive career opportunity.",
    thumbnail: "https://vumbnail.com/1168415329.jpg",
    seoTitle: "Why Developers Must Learn Accessible Coding | AltAccess",
    seoDescription: "Stand out in the tech industry. Learn why digital accessibility is a rapidly growing market, a legal requirement globally, and a massive career opportunity.",
    content: {
      intro: "Every year, the number of developers in Cambodia grows. But the number of software engineers who know how to build accessible websites and apps is still very low. Coding for accessibility means ensuring that users with disabilities can navigate your software effectively. But why is this a massive opportunity for your career and business?",
      sections: [
        {
          heading: "The Business & Legal Case for Digital Accessibility",
          body: "Investing in accessibility today protects businesses, seizes new job opportunities, and builds tech that leaves no one behind.",
          bullets: [
            "A Growing Global Market: With over 1.3 billion people living with disabilities, prioritizing accessibility allows businesses to reach a massive, untapped customer base.",
            "Strict Legal Requirements: In the US and Europe, digital accessibility is the law (such as the ADA). Companies face thousands of lawsuits for inaccessible websites.",
            "Cambodia's Digital Transformation: As government institutions, banks, and major corporations push for digital transformation, inclusive technology is becoming a priority."
          ]
        }
      ]
    }
  },
  {
    slug: "what-is-wcag",
    vimeoId: "1168415000",
    title: "What is WCAG?",
    titleKh: "ការណែនាំអំពី Web Content Accessibility Guideline",
    description: "Learn the basics of the Web Content Accessibility Guidelines (WCAG) and the POUR principles: Perceivable, Operable, Understandable, Robust.",
    thumbnail: "https://vumbnail.com/1168415000.jpg",
    seoTitle: "What is WCAG? The POUR Principles Explained | AltAccess",
    seoDescription: "Learn the basics of the Web Content Accessibility Guidelines (WCAG) created by W3C. Understand the POUR principles: Perceivable, Operable, Understandable, Robust.",
    content: {
      intro: "We often hear that a country has laws and a family has rules. But did you know that developing apps and websites has its own set of rules, too? These are the Web Content Accessibility Guidelines (WCAG), created by the W3C (the same organization that sets HTML and CSS standards).",
      sections: [
        {
          heading: "The 4 Core Principles: P-O-U-R",
          body: "While there are 86 success criteria in WCAG, developers can start by mastering the four foundational pillars:",
          bullets: [
            "Perceivable: Can users process the information? (e.g., providing Alt Text for images and subtitles for video).",
            "Operable: Can users navigate your app without a mouse? Your website must be fully functional using only a keyboard.",
            "Understandable: Is your content easy to read? Avoid technical jargon and make your UI/UX intuitive.",
            "Robust: Does your code follow web standards so it works across all modern browsers and assistive technologies like Screen Readers?"
          ]
        },
        {
          heading: "Understanding WCAG Compliance Levels",
          body: "WCAG is graded on three levels:",
          bullets: [
            "Level A: The absolute minimum requirement for accessibility.",
            "Level AA: The global standard required by law in the US and Europe.",
            "Level AAA: The highest, most inclusive gold standard."
          ]
        }
      ]
    }
  }
];
