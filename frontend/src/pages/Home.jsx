import React from "react";

const Home = () => {
  return (
    <section className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Welcome to MedConnect</h1>
          <p className="py-6 text-lg">
            Providing quality care and seamless medical services. Book appointments, view records, and more.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
