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
    id: 2.1,
    title: "Team",
    newTab: false,
    path: "/blog",
  },
    {
    id: 2.1,
    title: "Courses",
    newTab: false,
    path: "/courses",
  },
  
    {
    id: 2.1,
    title: "AddCourse",
    newTab: false,
    path: "/addCourses",
  },
  
  {
    id: 2.3,
    title: "Docs",
    newTab: false,
    path: "/docs",
  },
  {
    id: 3,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Team",
        newTab: false,
        path: "/blog",
      },
      {
        id: 34,
        title: "Sign In",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 35,
        title: "Sign Up",
        newTab: false,
        path: "/auth/signup",
      },
      {
        id: 35,
        title: "Docs",
        newTab: false,
        path: "/docs",
      },
      {
        id: 35.1,
        title: "Support",
        newTab: false,
        path: "/support",
      },
      {
        id: 36,
        title: "404",
        newTab: false,
        path: "/error",
      },
    ],
  },

  {
    id: 4,
    title: "Support",
    newTab: false,
    path: "/support",
  },
  


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
