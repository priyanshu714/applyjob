import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch(setSearchedQuery);
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="text-center mt-10">
            <div className="flex flex-col gap-6 my-10">
                <span className="mx-auto px-5 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm shadow-sm">
                    🚀 No. 1 Job Hunt Website
                </span>

                <h1 className="text-5xl font-bold leading-tight">
                    Search, Apply & <br />
                    Get Your{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                        Dream Jobs
                    </span>
                </h1>

                <p className="text-gray-600 max-w-xl mx-auto">
                    Discover thousands of job opportunities that match your skills and aspirations.
                </p>

                {/* Search Bar */}
                <div className="flex w-[50%] bg-white shadow-lg border border-gray-300 pl-4 pr-2 py-2 rounded-full items-center gap-3 mx-auto hover:shadow-xl transition duration-300">
                    <input
                        type="text"
                        placeholder="Find your dream job..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full text-gray-700 placeholder-gray-400 text-lg"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-full px-5 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition duration-300"
                    >
                        <Search className="h-6 w-6 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
