import { NavLink } from "react-router";
export default function Navbar() {
    return (
        <header>
            <div className="container">
                <NavLink
                    to="/"
                    className={({ isActive }) => (
                        isActive ? "active" : ""
                    )}
                ><h1>Workout Buddy</h1></NavLink>
            </div>
        </header>
    )
}