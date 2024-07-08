import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx";
import { Button } from "../ui/Button.jsx";
import {Container, Logo, LogoutBtn} from '../index'
import { ChevronRight, LoaderCircleIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Search from "../Search.jsx";
import { useQuery } from "@tanstack/react-query";

function Header() {
	const [profileImg, setProfileImg] = useState(null);
	
 const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData);

	// const userQuery = useQuery({
	// 	queryKey: ["user", userData._id],
	// 	queryFn: async () => {
	// 		const responce = userData
	// 	},
	// });
// if(!userData){
//   return <LoaderCircleIcon className="animate-spin mr-6 my-auto" />
// }
  useEffect(() => {
		if (userData) {
			setProfileImg(userData.avatar);
		}
	}, [userData]);
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
    name: "My posts",
    slug: "my-post",
    active:authStatus,
  },
  ]
	// if (userQuery.isLoading)
	// 	return <LoaderCircleIcon className="animate-spin mr-6 my-auto" />;
	// if (userQuery.error) {
	// 	console.log(userQuery.error);
	// 	return <div>Error loading user data</div>;
	// }

	return authStatus ? (
    <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
    <div className='mr-4 navbar-left'>
    <Link to='/'>
      <Logo width='200px'/>

      </Link>
  </div>
  <div className="navbar-center flex-1 max-w-xs mx-auto">
       <Search/>
  </div>
  <div className="flex bg-gray-900 py-4 px-5 navbar-right">
			<Avatar className="mr-2 text-white bg-gray-800 text-2xl">
				<AvatarImage src={profileImg} alt="@profileImg" className=''/>
				<AvatarFallback>
					{userData?.fullName
						? (userData.fullName.charAt(0)) +
						  (userData.fullName.indexOf(" ") !== -1
								? userData.fullName.charAt(
										userData.fullName.indexOf(" ") + 1
								  )
								: "")
						: ""}
				</AvatarFallback>
			</Avatar>
       {console.log("reached")}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="group  text-white text-md flex gap-1 pr-2 transition-all "
					>
						{userData?.fullName}
						<ChevronRight className="h-4 w-4 group-hover:rotate-90 transition-all" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-10 bg-black  text-white  w-40 text-lg">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className=" text-white cursor-pointer">
						<Link className='hover:text-1xl' to={'/profile'}>Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild className="text-white cursor-pointer">
						<Link to={"/add-post"}>Create New Post</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="text-white cursor-pointer">
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-white cursor-pointer" >
						<LogoutBtn />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
  </div>

	) : (
    
    <header className='py-3 px-3 shadow bg-gray-900'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 text-white hover:bg-gray-800 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )


}

export default Header;
