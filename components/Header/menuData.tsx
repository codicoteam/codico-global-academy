import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Features",
    newTab: false,
    path: "/#features",
  },
  
  {
    id: 3,
    title: "Courses",
    newTab: false,
    path: "/courses",
  },

  {
    id: 4,
    title: "AddCourse",
    newTab: false,
    path: "/addCourses",
  },
  {
    id: 5,
    title: "Learning Paths",
    newTab: false,
    path: "/learningPath",
  },

  {
    id: 6,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 61,
        title: "Team",
        newTab: false,
        path: "/Team",
      },
      {
        id: 62,
        title: "Sign In",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 63,
        title: "Sign Up",
        newTab: false,
        path: "/auth/signup",
      },

      {
        id: 64,
        title: "Support",
        newTab: false,
        path: "/support",
      },
    ],
  },

  //{
  //id: 4,
  //title: "Support",
  //newTab: false,
  //path: "/support",
  //},

  // {
  //         "courseImage": "should be uploaded as a file",
  //         "title": "Full Stack Web Development",
  //         "description": "Learn to build modern web applications using React, Node.js, Express, and MongoDB.",
  //         "category": "Web Development",
  //         "instructor": {
  //           "name": "John Doe",
  //           "email": "
  // johndoe@codico.com
  // ",
  //           "experience": "5 years"
  //         },
  //         "duration": "12 weeks",
  //         "price": 500,
  //         "currency": "USD",
  //         "level": "Beginner to Advanced",
  //         "mode": "Online",
  //         "prerequisites": [
  //           "Basic understanding of programming",
  //           "Familiarity with HTML, CSS, and JavaScript"
  //         ],
  //         "syllabus": [
  //           {
  //             "week": 1,
  //             "topic": "Introduction to Web Development",
  //             "content": "Understanding HTML, CSS, and JavaScript fundamentals."
  //           },
  //           {
  //             "week": 2,
  //             "topic": "Frontend Development with React",
  //             "content": "Setting up React, state management, and building UI components."
  //           }
  //         ],
  //         "enrollment_status": "Open",
  //         "certification": {
  //           "provided": true,
  //           "certificate_name": "Full Stack Web Developer Certificate",
  //           "issuing_body": "Codico Software Solutions"
  //         }
  //       }
];

export default menuData;
