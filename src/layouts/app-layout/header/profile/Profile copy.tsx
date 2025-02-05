import { IoIosArrowDown } from "react-icons/io";

const Profile = () => {
    return (
        <div className="cursor-pointer flex items-center gap-1">
            <div className="relative">
                <img
                    className="w-[32px] h-[32px] object-cover rounded-full"
                    src="/user.jpg"
                    alt="user"
                />
                <span className="absolute bottom-0 right-0 border-2 size-2 bg-green-400 rounded-full"></span>
            </div>
            <IoIosArrowDown className="text-gray-400 size-3" /> 
        </div>
    );
};

export default Profile;
