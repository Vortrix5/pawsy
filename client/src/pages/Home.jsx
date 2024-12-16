import { Link } from "react-router-dom";
import {
  Heart,
  Search,
  Users,
  PawPrint,
  Home as HomeIcon,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AnimatedText from "../components/shared/AnimatedText";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center -mt-4 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        <div className="relative container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white flex flex-wrap justify-center items-center gap-x-3">
            Find Your Perfect <AnimatedText />
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover loving pets waiting for their forever homes. Our adoption
            process makes it easy to give a pet a second chance at happiness.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/pets"
              className="px-8 py-4 rounded-full bg-white text-primary hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg inline-flex items-center justify-center gap-2"
            >
              <PawPrint className="w-5 h-5" />
              Find a Pet
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white/20 transform hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Register to Adopt
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose <span className="text-primary">Pawsy</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              Easy Search
            </h3>
            <p className="text-gray-600 text-center">
              Find your perfect companion with our advanced search filters and
              matching system
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <HomeIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              Home Visits
            </h3>
            <p className="text-gray-600 text-center">
              We ensure every pet goes to a loving home with our thorough but
              friendly process
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">
              Lifetime Support
            </h3>
            <p className="text-gray-600 text-center">
              Our support doesn't end with adoption - we're here for you and
              your pet always
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1444212477490-ca407925329e?w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">
            Happy <span className="text-secondary">Stories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                  alt="Sarah"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sarah & Max</div>
                  <div className="text-sm text-gray-500">Adopted in 2023</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Adopting Max was the best decision we ever made. The team at
                Pawsy made the process so smooth and were there for us every
                step of the way."
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <PawPrint className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  alt="Mike"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">Mike & Luna</div>
                  <div className="text-sm text-gray-500">Adopted in 2023</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Luna has brought so much joy to our family. The support from
                Pawsy didn't end with adoption - they're still there whenever we
                need advice."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mb-20">
        <div
          className="rounded-2xl p-16 text-center relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
              Start your journey today and give a loving pet a forever home.
              Every adoption makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pets"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
              >
                <PawPrint className="w-5 h-5" />
                View Available Pets
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white border-2 border-white hover:bg-white/20 transform hover:scale-105 transition-all"
                >
                  <Users className="w-5 h-5" />
                  Register Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
