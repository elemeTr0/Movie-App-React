import { useNavigate } from "react-router-dom";
interface NavbarProps {
    searchMovie: (c: string) => void;
}
export default function Navbar({ searchMovie }: NavbarProps) {
    const navigate = useNavigate();
    function handleHome() {
        navigate("/");
    }
    
    function handleSearch(value: string) {
        searchMovie(value);
        if (value.trim() !== "") {
            navigate("/search");
        } else {
            navigate("/");
        }
    }
    return (
        <div className="Navbar" style={{position: "relative"}}>
            {" "}
            <button onClick={handleHome}>Home</button>{" "}
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
            />{" "}
        </div>
    );
}
