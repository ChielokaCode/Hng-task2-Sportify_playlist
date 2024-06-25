import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Playlist from "./Playlist";
import axios from "axios";

const Dashboard = () => {
  const { username } = useParams();
  const [greeting, setGreeting] = useState("");
  const [dob, setDOB] = useState(null);
  const [isGreeting, setIsGreeting] = useState(false);

  useEffect(() => {
    const fetchGreeting = async () => {
      console.log(username);
      try {
        const response = await axios.get(
          `https://hng-task1-16z0.onrender.com/api/hello?visitor_name=${username}`
        );
        console.log("Response:", response.data);
        setGreeting(response.data.greeting);
        setIsGreeting(true);
      } catch (error) {
        console.error("Error:", error);
        setIsGreeting(false);
      }
    };

    fetchGreeting();
  }, []);

  return isGreeting ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">{greeting}</h2>
        <div>
          <label
            htmlfor="dob"
            classname="block text-sm font-medium text-gray-700 pl-4"
          >
            Enter of Date of Birth:
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            required
            classname="block w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={dob}
            onChange={() => setDOB(e.target.value)}
          />
        </div>
        <hr />
        <Playlist dob={dob} />
      </div>
    </div>
  ) : (
    <h3 className="text-xl font-normal text-center justify-center">
      Loading...
    </h3>
  );
};

export default Dashboard;
