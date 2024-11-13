const Profile = () => {
    return (
        <div className="cursor-pointer flex items-center">
            <div className="relative">
                <img
                    className="w-[32px] h-[32px] size-full object-cover rounded-full"
                    src="/user.jpg"
                    alt="user"
                />
                <span className="absolute bottom-0 right-0 border-2 size-2 bg-green-400 rounded-full"></span>
            </div>
            <i className="fa-solid fa-chevron-down ml-2  text-[#9095A1FF]"></i>
        </div>
    );
};

export default Profile;
