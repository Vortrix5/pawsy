import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">Pawsy</span>
            </div>
            <p className="text-gray-600">
              Finding forever homes for our furry friends.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets" className="text-gray-600 hover:text-primary">
                  Available Pets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Pawsy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
