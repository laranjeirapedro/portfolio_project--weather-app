import Image from "next/image"
import Logo from "@/public/SkyWatch_Logo.png";

export const Header = () => {
    return (
        <div className="m-4">
            <Image 
                src={Logo}
                alt="logo" 
                width={150}
                height={150}
            />
        </div>
    )
}