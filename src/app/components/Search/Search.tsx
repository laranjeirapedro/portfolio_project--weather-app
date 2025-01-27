import { FaSearch } from "react-icons/fa";

export const Search = () => {
    return (
        <div className="w-full">
            <div className="w-full">
                <form action="" className="w-full relative flex justify-center">
                    <input type="text" placeholder="Search your Address, City or Postal Code" className="p-2 px-16 w-2/5 h-10 rounded-md" />
                    <FaSearch className="absolute translate-x-[-250px] top-2 text-xl"/>
                </form>
            </div>
        </div>
    )
}