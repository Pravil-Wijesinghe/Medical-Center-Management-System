import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          MedConnect
        </Link>
      </div>
      <div className="flex gap-4">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
        {/* Add links to Login, Services, etc. */}
      </div>
    </div>
  );
};

export default Navbar;
