import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Etros Basketball</h3>
          <p className="text-gray-400">
            Where legends are made and champions thrive.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/team" className="text-gray-400 hover:text-white">
                Team
              </Link>
            </li>
            <li>
              <Link to="/schedule" className="text-gray-400 hover:text-white">
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-gray-400 hover:text-white">
                News
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <address className="text-gray-400 not-italic">
            Etros Arena
            <br />
            123 Basketball Court
            <br />
            Sports City, SC 12345
            <br />
            <a
              href="mailto:info@etrosbasketball.com"
              className="hover:text-white"
            >
              info@etrosbasketball.com
            </a>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} Etros Basketball. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
