"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Page() {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
    heardFrom: "",
  });

  // Input Handler
  const handleInput = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      alert("Message sent successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-muted min-h-svh p-6 md:p-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-10">Contact Us</h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Questions about our solutions? Interested in speaking with a team
            member? Looking to request a demo? Send us a message today.
          </p>

          <br />
          <br />

          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg">NORTH AMERICA</h3>
              <p className="text-gray-600">
                Snipp Interactive Inc.
                <br />
                Suite 1700, Example Street, Canada
                <br />
                1.888.99.SNIPP (1.888.99.76477)
              </p>
            </div>

            <div>
              <h3 className="text-lg">USA</h3>
              <p className="text-gray-600">
                Snipp Interactive Inc.
                <br />
                20860 N. Tatum Blvd., Suite 300,
                <br />
                Phoenix, Arizona 85050
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">EUROPE</h3>
              <p className="text-gray-600">Ireland</p>
              <p className="text-gray-600">
                51 South Mall,
                <br />
                Cork. Ireland T12 XFH6
              </p>
            </div>

            <div>
              <h3 className="text-lg">Switzerland</h3>
              <p className="text-gray-600">
                C/o Thouvenin Rechtsanwälte & Partner,
                <br />
                Klausstrasse 33, 8024 Zurich
              </p>
            </div>

            <div>
              <h3 className="text-lg">Italy</h3>
              <p className="text-gray-600">
                Via Maria Callas 3, Vigevano 27029
                <br />
                Pavia, Italy
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">ASIA</h3>
              <p className="text-gray-600">India</p>
              <p className="text-gray-600">
                152 A-1, Shah & Nahar Industrial Estates, Sitaram Jadhav Marg,
                <br />
                Lower Parel, Mumbai 400 013. India
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-38">
          <h2 className="text-2xl font-semibold py-8">
            Fill out the form to contact us
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Contact us for anything related to our company or service. We will
            get back to you as soon as possible.
          </p>

          <form className="space-y-1">
            <div>
              <label className="block text-gray-800 text-sm mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                onChange={handleInput}
                className="w-full border border-gray-300 bg-gray-200 h-9 px-4 rounded-xs outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 text-sm mb-1">
                  First name<span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  onChange={handleInput}
                  className="w-full border border-gray-300 bg-gray-200 h-9 px-4 rounded-xs outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-800 text-sm mb-1">
                  Last name<span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  onChange={handleInput}
                  className="w-full border border-gray-300 bg-gray-200 h-9 px-4 rounded-xs outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 text-sm mb-1">
                  Company name<span className="text-red-500">*</span>
                </label>
                <input
                  name="companyName"
                  type="text"
                  onChange={handleInput}
                  className="w-full border border-gray-300 bg-gray-200 h-9 px-4 rounded-xs outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-800 text-sm mb-1">
                  Phone number<span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  type="text"
                  onChange={handleInput}
                  className="w-full border border-gray-300 bg-gray-200 h-9 px-4 rounded-xs outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 text-sm mb-1">
                Country/Region (Snipp)
              </label>
              <select
                name="country"
                onChange={handleInput}
                id="country"
                className="w-full rounded-xs text-gray-600 border border-gray-300 p-1 bg-gray-200 h-9 px-4 focus:outline-none"
              >
                <option value="">Please Select</option>
                <option value="usa">United States</option>
                <option value="india">India</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-800 text-sm mb-1">
                Subject<span className="text-red-500">*</span>
              </label>
              <select
                name="subject"
                onChange={handleInput}
                id="subject"
                className="w-full rounded-xs text-gray-600 border border-gray-300 p-1 bg-gray-200 h-9 px-4 focus:outline-none"
              >
                <option value="">Please Select</option>
                <option value="sales">Sales</option>
                <option value="investor">Investor</option>
                <option value="press">Press</option>
                <option value="help-tech-support">
                  Help & Tech Support for a program you participated in
                </option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                onChange={handleInput}
                className="w-full border rounded-xs px-4 py-2 h-15 px-4 bg-gray-200 resize-none focus:ring-2 focus:ring-gray-300 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-800 text-sm mb-1">
                How did you hear about us?
                <span className="text-red-500">*</span>
              </label>
              <input
                name="heardFrom"
                type="text"
                onChange={handleInput}
                className="w-full border border-gray-300 bg-gray-200 bg-gray-100 h-15 px-4 rounded-xs outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-10 py-2 mt-3 rounded-md bg-gray-300 hover:bg-gray-200 text-black font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
