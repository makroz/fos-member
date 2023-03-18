import Image from "next/image";
const UserAvatar = ({ user }) => {
  return (
    <>
      <div className=" overflow-visible">
        {user.photoURL && (
          <Image
            className="rounded-full"
            src="/images/people/profile-picture-5.jpg"
            alt="avatar"
            width="40"
            height="40"
          />
        )}
        {!user.photoURL && (
          <div className="overflow-visible relative justify-center items-center w-10 h-10 bg-primary rounded-full">
            <Image
              src="/assets/images/avatar.png"
              alt="avatar"
              width="40"
              height="40"
            />
            {/* <span className="font-medium text-gray-600 ">
          {initialsName(user.name)}
        </span> */}
          </div>
        )}
      </div>
    </>
  );
};

export default UserAvatar;
