import React from "react";
import Header from "@/components/custom/Header";

function Contact() {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen flex items-center justify-center">
      <Header />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">
          Contact Us
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={ "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"}
              alt="Contact"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 resize-none"
                  rows="4"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
    </div>
  </div>
  );
}

export default Contact;