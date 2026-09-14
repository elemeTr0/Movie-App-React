import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    searchMovie: (c: string) => void;
}

export default function Navbar({ searchMovie }: NavbarProps) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    function handleHome() {
        setSearch("");
        searchMovie("");
        navigate("/");
    }

    function handleSearch(value: string) {
        setSearch(value);
        searchMovie(value);

        if (value.trim() !== "") {
            navigate("/search");
        } else {
            navigate("/");
        }
    }

    return (
        <div className="Navbar" style={{ position: "relative" }}>
            <button onClick={handleHome}>Home</button>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}