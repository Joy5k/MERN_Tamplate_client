import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="">
        {/* Section 1: About the Website */}
        <div className=" shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold  mb-4">About the Website</h1>
          <p className="text-gray-400 leading-relaxed mb-4">
            Welcome to our platform! This website is designed to provide exceptional services and a seamless user experience. 
            It’s built with a modern tech stack to ensure performance, scalability, and user satisfaction.
          </p>
          <p className=" leading-relaxed">
            Our focus is on creating intuitive, feature-rich applications tailored to the needs of our audience. 
            Whether you're here to explore, connect, or grow, this website aims to make your journey worthwhile.
          </p>
        </div>

        {/* Section 2: About Me */}
        <div className=" shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold  mb-4">About The Developer</h1>
          <p className="text-gray-400 leading-relaxed mb-4">
            Hello! I’m <Link to="https://developer-mehedi.vercel.app" target="_blank" className="hover:underline text-primary font-semibold">Mehedi Hasan Joy</Link>, a passionate Full Stack Web Developer. 
            I specialize in building dynamic, responsive, and user-friendly web applications. 
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            My skillset includes:
          </p>
          <ul className="list-disc list-inside text-gray-400 mb-4">
            <li>JavaScript, TypeScript</li>
            <li>React.js, Redux, Next.js</li>
            <li>Prisma, MongoDB, Mongoose, PostgreSQL</li>
            <li>Node.js, Express.js</li>
            <li>Ant Design, Material UI, Tailwind CSS</li>
          </ul>
          <p className="text-gray-400 leading-relaxed">
            I am also a final-year student pursuing a bachelor's degree in BSS at Govt. Barisal College, Bangladesh. 
            My journey is fueled by curiosity and a drive to solve real-world problems through technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
