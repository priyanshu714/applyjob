import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {
              user &&user.role==='recruiter'?(
                <>
                <li className="hover:text-[#F83002] cursor-pointer"><Link to="/admin/companies">Companies</Link></li>
                <li className="hover:text-[#F83002] cursor-pointer"><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ):(
                <>
                <li className="hover:text-[#F83002] cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-[#F83002] cursor-pointer"><Link to="/jobs">Jobs</Link></li>
            <li className="hover:text-[#F83002] cursor-pointer"><Link to="/browse">Browse</Link></li>
                </>
              )
            }
            
          </ul>
          {
            !user? (
              <div className="flex items-center gap-2">
                <Link to="/login"> <Button variant='outline'>Login</Button></Link>
               <Link to="/signup"> <Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button></Link>
               
              </div>  

            ):(
              <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer w-10 h-10 border border-gray-300">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4">
              <div className="flex items-center gap-3 border-b pb-3">
                <Avatar className="w-12 h-12 border border-gray-300">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="text-base font-semibold">{user?.fullname}</h4>
                  <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-3 text-gray-700">
                {
                  user && user.role==='student' && (
                    <div className="flex items-center gap-3 cursor-pointer hover:text-[#F83002]">
                    <User2 size={18} />
                    <Button variant="link" className="p-0 h-auto"><Link to='/profile'>View Profile</Link>
                    
                    </Button>
                  </div>
                  )
                }
               
                <div className="flex items-center gap-3 cursor-pointer hover:text-[#F83002]">
                  <LogOut size={18} />
                  <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
            )
          }

          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
