// import { useEffect, useState, useRef } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { Blog, Team } from "@/types/team";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { db } from "@/app/config";

// const Teamitem = () => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const isMounted = useRef(false); 

//   useEffect(() => {
//     if (isMounted.current) return; 
//     isMounted.current = true;

//     const fetchCourses = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "courses"));
//         const coursesData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         console.log("Fetched Courses Data: ", coursesData); 

//         const uniqueCourses = Array.from(new Map(coursesData.map((item) => [item.id, item])).values());
        
//         console.log("Unique Courses Data: ", uniqueCourses);

//         setCourses(uniqueCourses); 
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []); // Empty dependency array to ensure it runs only once on mount
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {courses.length === 0 ? (
//         <p className="text-center text-gray-500">No courses available.</p>
//       ) : (
//         courses.map((course) => (
//           <motion.div
//             key={course.id}
//             initial="hidden"
//             whileInView="visible"
//             transition={{ duration: 1, delay: 0.5 }}
//             viewport={{ once: true }}
//             className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
//           >
//             <Link href={/course/${course.id}} className="relative block aspect-[368/239]">
//               <Image src={course.courseImage} alt={course.title} fill className="object-cover rounded-lg" />
//             </Link>

//             <div className="px-4">
//               <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
//                 <Link href={/course/${course.id}}>{course.title.slice(0, 40)}...</Link>
//               </h3>
//               <p className="line-clamp-3">{course.description}</p>
//               <p className="text-sm text-gray-500">
//                 {course.duration} - {course.level}
//               </p>
//               <p className="font-bold">
//                 {course.currency} {course.price}
//               </p>
//             </div>
//           </motion.div>
//         ))
//       )}
//     </>
//   );
// };

// export default Teamitem; 