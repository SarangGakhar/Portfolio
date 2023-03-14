import React from "react";

const About = () => {
  return (
    <div
      name="about"
      className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500" style={{paddingTop:'1rem'}}>
            About
          </p>
        </div>

        <p className="text-xl mt-20">
          Hi my name is sarang, i am currentlt studying in chitkara university punjab 
          persuing BE in CSE.
        </p>

        <br />

        <p className="text-xl">
          Currently I am in 6th sem and I am skilled in React, Redux, Node js, Mongodb, Express, 
          Postgress, C++, Datastructures, Algorithms, OOPS, Operating Systems and DBMS

        </p>
      </div>
    </div>
  );
};

export default About;
