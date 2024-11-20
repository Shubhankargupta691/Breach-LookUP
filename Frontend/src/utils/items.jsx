import React from "react";

export const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Password', path: '/password' },
  { name: 'Scanner', path: '/scanner' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'FAQ', path: '/faq' },
];



export const EmailHeader = [
    {
        id: 1,
        title1: "BREACH",
        title2: "LOOKUP",
        content: [
            "CHECK IF YOUR EMAIL OR USERNAME WAS COMPROMISED"
        ]
    },
]


export const PassHeader = [
    {
        id: 1,
        title1: "BREACH",
        title2: "LOOKUP",
        content: [
            "CHECK THE STRENGTH OF A PASSWORD"
        ]
    },
]


export const Social = [
  {
    id: 1,
    link: "https://github.com/your-repo",
    path: "/github-mark-white.svg",
    name: "Github",
  },
];

export const  privacyHeader = [
    {
      id: 1,
      title1: "HOW BREACHLOOKUP ",
      title2: "HANDLES USER PRIVACY",
      content: [
        "WE DO NOT STORE ANY USER DATA BUT OUR THIRD PARTY PROVIDERS MAY COLLECT DATA ABIDING BY THE DEFINITIONS BELOW"
      ]
    },    
];

export const  privacyPolicyData = [
    {
      id: 1,
      title: "Definitions",
      content: [
        "BreachLookUp is the publisher and operator of BreachLookUp.org (the 'Site') whereby BreachLookUp operates a search engine and various services (the 'Services') available.",
        "When 'Site' or 'Services' are referenced, such reference includes all hardware, software, and network resources necessary to provide said Site and/or Service.",
        "When first-person pronouns are used in this Agreement, these provisions are referring to BreachLookUp.",
        "As a client and the user of the Site or Services, this Agreement will refer to You through any second-person pronouns, such as 'You', 'Yours' etc.",
        "This policy describes how we use the information we receive about you when you visit our Site, when you subscribe to or otherwise use our online services.",
        "This policy does not cover any information that we may receive from you or about you through channels other than the Site."
      ]
    },
    {
      id: 2,
      title: "Revisions",
      content: [
        "The terms of this Privacy Policy are subject to change at any time – we will take reasonable steps to notify users of changes to the Privacy Policy on our Site.",
        "Your continued use of this Site as a result of any changes to this Policy will be deemed a consent to our Privacy and Personal Information practices.",
        "By using this site, you agree to be bound by the then current version of this Privacy Policy.",
        "If we make a major change to this Privacy Policy, such as changing the legal basis for the processing of your personal information, we will ask you to agree to the revised Privacy Policy again."
      ]
    },
    {
      id: 3,
      title: "Cookies",
      content: [
          "We use cookies to collect information about you and your activity on our site. A cookie is a small piece of data that our site stores on your computer and is accessed each time we visit to help us understand how you use our site. This helps us to provide content in accordance with your preferences."
      ]
    },
    
  ];

  export const faqHeadeer = [
    {
        id: 1,
        title1: "FREQUENTLY ASKED",
        title2: "QUESTIONS",
        
    }
  ]

  export const Questions = [
    {
      id:1,
      question: "WHAT IS A BREACH AND WHERE HAS THE DATA COME FROM?",
      answer: "A breach is an incident where data is inadvertently exposed in a vulnerable system, usually due to insufficient access controls or security weaknesses in the software. BreachLookUp aggregates breaches and enables people to assess where their personal data has been exposed."
    },
    {
        id:2,
        question: "HOW ARE BREAHCES ADDED TO BreachLookUp?",
        answer: ["Breach is identified through scraping news sites, data breach reporting sites, and forums.",
                "Breach data is found, downloaded, and confirmed using artificial intelligence.",
                "Artificial intelligence is used to decompress and parse the data and bad/incomplete entries are automatically removed.",
                "Passwords, emails, and usernames are identified."
]
      },
    {
      id:3,
      question: "Can I delete my account?",
      answer: "BreachLookUp does not store any user accounts, so there is no account to delete. However, third-party services may have their own policies regarding account deletion."
    },
    
];

