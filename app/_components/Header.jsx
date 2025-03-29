"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../_components/Logo";
import cancel from "../../public/cancel.svg";
import { usePathname } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import signUpPic from "../../public/sign-upPic.png";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import Image from "next/image";
import { createUser } from "../services/apiUsers"; // Import the createUser function
import { getCourses } from "../services/apiCourses"; // Import the getCourses function

// VisuallyHidden component for accessibility
const VisuallyHidden = ({ children }) => (
  <span className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] border-0">
    {children}
  </span>
);

export default function Header() {
  const [date, setDate] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);
  const fullscreenChecked = useRef(false);
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const [showNativePicker, setShowNativePicker] = useState(false);

  // ფუნქცია, რომელიც დააბრუნებს მხოლოდ მნიშვნელობას input-ის value-დან
  const handleChange = (e) => {
    setValue(e.target.value);
    setShowNativePicker(!!e.target.value); // თუ მნიშვნელობა არსებობს, აღარ ვაჩენთ placeholder-ს
  };

  // Handle fullscreen check on initial render and window resize
  useEffect(() => {
    const checkViewportWidth = () => {
      const isMobile = window.innerWidth < 1024;
      if (isFullscreen !== isMobile) {
        setIsFullscreen(isMobile);
      }
    };

    if (!fullscreenChecked.current) {
      checkViewportWidth();
      fullscreenChecked.current = true;
    }

    window.addEventListener("resize", checkViewportWidth);
    return () => {
      window.removeEventListener("resize", checkViewportWidth);
    };
  }, [isFullscreen]);

  // Fetch courses when the registration dialog opens
  useEffect(() => {
    if (isRegistrationOpen && courses.length === 0) {
      fetchCourses();
    }
  }, [isRegistrationOpen]);

  // Function to fetch courses from Supabase
  const fetchCourses = async () => {
    setIsCoursesLoading(true);
    try {
      const coursesData = await getCourses();
      if (coursesData && coursesData.length > 0) {
        setCourses(coursesData);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsCoursesLoading(false);
    }
  };

  // Function to close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // ბეზოპასნი ფუნქცია მენიუს გასახსნელად, იყენებს setTimeout-ს რომ მოხდეს ახალი ციკლში
  const safelyToggleMobileMenu = () => {
    setTimeout(() => {
      setMobileMenuOpen((prev) => !prev);
    }, 0);
  };

  // ბეზოპასნი ფუნქცია რეგისტრაციის დიალოგის გასახსნელად
  const safelySetRegistrationOpen = (open) => {
    setTimeout(() => {
      setIsRegistrationOpen(open);
    }, 0);
  };

  // Registration form component
  const RegistrationForm = () => {
    const handleCancel = () => {
      // უსაფრთხოდ ვხურავთ დიალოგს
      setTimeout(() => {
        setIsRegistrationOpen(false);
        setFormError("");
        setFormSuccess(false);
      }, 0);
    };

    // Handle form submission: extract form data and insert into "users_form" table
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setFormError("");

      const formData = new FormData(e.target);

      if (!formData.get("terms")) {
        setFormError("გთხოვთ დაეთანხმოთ წესებს და პირობებს");
        setIsLoading(false);
        return;
      }

      try {
        // Get the course ID from the form
        const courseId = formData.get("choosedCourse");

        // Find the corresponding course object to get the title
        const selectedCourse = courses.find(
          (course) => course.id.toString() === courseId
        );

        // Get the course title (or use a fallback if not found)
        const courseTitle = selectedCourse ? selectedCourse.title : "";

        const userData = {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phoneNumber: formData.get("phoneNumber"),
          birth_date: formData.get("birth_date"),
          socialId: formData.get("socialId"),
          choosedCourse: courseTitle, // Save the course title instead of ID
          choosedCourseId: courseId, // Optionally keep the ID as well
          choosedMedia: formData.get("choosedMedia"),
        };

        await createUser(userData);
        setFormSuccess(true);

        e.target.reset();

        setTimeout(() => {
          setIsRegistrationOpen(false);
          setFormSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Registration error:", error);
        setFormError(
          "შეცდომა მოხდა რეგისტრაციისას. გთხოვთ, სცადოთ მოგვიანებით."
        );
      } finally {
        setIsLoading(false);
      }
    };

    // ვეთანხმები ტექსტზე დაჭერის დამუშავება
    const handleTermsClick = (e) => {
      // თავიდან ავირიდოთ ბაბლინგი, რომ არ მოხდეს ჩეკბოქსის ჩართვა/გამორთვა
      e.preventDefault();
      e.stopPropagation();

      // აქ შეგიძლიათ დაამატოთ წესებისა და პირობების დიალოგის ჩვენება
      alert("წესებისა და პირობების გვერდი ჯერ ხელმისაწვდომი არ არის");
    };

    return (
      <div className="flex relative p-2 lg:p-4 w-full caps-text rounded-[8px] lg:rounded-[20px] flex-col lg:flex-row h-full lg:max-h-[650px]">
        <div className="hidden lg:flex bg-[#EAF1FA] h-[auto] w-full lg:w-[50%] items-center justify-center rounded-[20px]">
          <img
            src={signUpPic.src}
            alt="sign-up-illustration"
            className="w-[544px]  object-cover"
          />
        </div>

        <div
          className={`w-full  lg:w-[50%] p-4 lg:p-8 ${
            isFullscreen
              ? "max-h-[80vh] overflow-y-auto"
              : "h-[650px] overflow-y-hidden"
          }`}
        >
          <div className="mb-12 flex items-center justify-between relative ">
            <div>
              <h2 className="text-xl max-lg:mt-[48px] lg:text-2xl font-bold text-[#434A53]">
                კურსზე რეგისტრაცია
              </h2>

              <div className="mt-2 h-1 w-20 lg:w-24 rounded-[4px] bg-primary-500"></div>
            </div>
            <Image
              className="right-[10px] lg:right-[15px] cursor-pointer w-[30px] h-[30px] lg:w-[36px] lg:h-[36px] z-10"
              src={cancel}
              onClick={handleCancel}
              alt="cancel svg"
            />
          </div>

          {formSuccess ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 mb-4">
              რეგისტრაცია წარმატებით დასრულდა! მადლობა.
            </div>
          ) : (
            <form className="space-y-3 lg:space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="w-full font-[500] mt-1 text-[#8F949A] bg-white shadow-none border border-[#E7ECF2] text-[13px] lg:text-sm pt-2 pl-3 lg:pl-4 h-[45px] lg:h-[50px]"
                    placeholder="სახელი"
                    required
                  />
                </div>
                <div>
                  <Input
                    id="lastName"
                    name="lastName"
                    className="w-full font-[500] mt-1 text-[#8F949A] bg-white shadow-none border border-[#E7ECF2] text-[13px] lg:text-sm pt-2 pl-3 lg:pl-4 h-[45px] lg:h-[50px]"
                    placeholder="გვარი"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <Input
                    id="telephone"
                    name="phoneNumber"
                    className="w-full font-[500] mt-1 text-[#8F949A] bg-white shadow-none border border-[#E7ECF2] text-[13px] lg:text-sm pt-2 pl-3 lg:pl-4 h-[45px] lg:h-[50px]"
                    placeholder="ტელეფონი"
                    required
                  />
                </div>

                <div className="relative w-full rounded-[4px]">
                  {!value && !showNativePicker && (
                    <div
                      className="absolute w-full rounded-[4px] inset-y-0 left-0 flex items-center pl-3 lg:pl-4 text-[#8F949A] text-[13px] lg:text-sm cursor-pointer"
                      onClick={() => {
                        setTimeout(() => {
                          setShowNativePicker(true);
                          // ფოკუსი გავაკეთოთ hidden input-ზე
                          const dateInput =
                            document.getElementById("actual-dob-input");
                          if (dateInput && dateInput.showPicker) {
                            dateInput.showPicker();
                          } else if (dateInput) {
                            dateInput.focus();
                          }
                        }, 0);
                      }}
                    >
                      <p className="max-sm:text-[13px] rounded-[4px] w-full mt-3">
                        mm/dd/yyyy
                      </p>
                    </div>
                  )}

                  {/* ნამდვილი date input */}
                  <Input
                    id="actual-dob-input"
                    name="birth_date"
                    type="date"
                    value={value}
                    onChange={handleChange}
                    className={`w-full font-[500] mt-1 ${
                      value ? "text-secondary-500" : " text-transparent"
                    } bg-white rounded-[4px] w-full border border-[#E7ECF2] text-[13px] lg:text-sm pt-2 pl-3 pr-4 lg:pl-4 h-[45px] lg:h-[50px]`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    className="w-full font-[500] mt-1 text-[#8F949A] bg-white shadow-none border border-[#E7ECF2] text-[13px] lg:text-sm pt-2 pl-3 lg:pl-4 h-[45px] lg:h-[50px]"
                    placeholder="ელ.ფოსტა"
                    required
                  />
                </div>
                <div>
                  <Input
                    id="personalId"
                    name="socialId"
                    className="w-full font-[500] mt-1 text-[#8F949A] bg-white shadow-none border border-[#E7ECF2] text-[13px] lg:text-sm pt-2 pl-3 lg:pl-4 h-[45px] lg:h-[50px]"
                    placeholder="პირადი ნომერი"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <select
                    id="course"
                    name="choosedCourse"
                    defaultValue=""
                    className="w-full mt-1 font-[500] text-[#8F949A] bg-white shadow-none border border-[#E7ECF2] text-[13px] lg:text-sm pt-2 pl-3 lg:pl-4 h-[45px] lg:h-[50px] rounded-[4px] cursor-pointer appearance-none focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  >
                    <option value="" disabled>
                      {isCoursesLoading
                        ? "მიმდინარეობს ჩატვირთვა..."
                        : "აირჩიეთ კურსი"}
                    </option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id.toString()}>
                        {course.title}
                      </option>
                    ))}
                    {/* Fallback options if courses don't load */}
                    {courses.length === 0 && !isCoursesLoading && (
                      <>
                        <option value="web">ვებ დეველოპმენტი</option>
                        <option value="mobile">მობაილ დეველოპმენტი</option>
                        <option value="design">გრაფიკული დიზაინი</option>
                      </>
                    )}
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                </div>
              </div>

              <div className="mb-2 lg:mb-4">
                <div className="relative">
                  <select
                    id="whereHeard"
                    name="choosedMedia"
                    defaultValue=""
                    className="w-full mt-1 font-[500] text-[#8F949A] bg-white shadow-none border border-[#E7ECF2] text-[13px] lg:text-sm pt-1 pl-3 lg:pl-4 h-[45px] lg:h-[50px] rounded-[4px] cursor-pointer appearance-none focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  >
                    <option value="" disabled>
                      აირჩიეთ წყარო
                    </option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="friend">მეგობრისგან</option>
                    <option value="other">სხვა</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" name="terms" required />
                <Label
                  htmlFor="terms"
                  className="text-xs lg:text-sm regular-text cursor-pointer text-[#434A53]"
                >
                  ვეთანხმები{" "}
                  <span
                    className="text-[#5387C9] cursor-pointer"
                    onClick={handleTermsClick}
                  >
                    წესებს და პირობებს
                  </span>
                </Label>
              </div>

              {formError && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {formError}
                </div>
              )}

              <div className="pt-3 lg:pt-4 pb-4">
                <Button
                  type="submit"
                  className="w-full bg-primary-500 h-[46px] lg:h-[56px] hover:bg-primary-600 duration-300 transition-all text-white text-sm lg:text-base py-2 rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "მიმდინარეობს..." : "გაგზავნა"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  // Modal content style based on screen size
  const getDialogContentStyle = () => {
    return isFullscreen
      ? {
          border: "none",
          borderRadius: "0px",
          maxHeight: "100vh",
          overflowY: "auto",
        }
      : {
          maxHeight: "90vh",
          height: "auto",
          borderRadius: "20px",
          border: "none",
          overflowY: "hidden",
        };
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50">
      <nav className="container max-sm:max-w-[95%] mx-auto flex items-center justify-between py-4 pl-7 pr-5 nav-shadow rounded-[16px] bg-white mt-6">
        <Logo />

        <ul className="hidden lg:flex caps-text gap-[36px] font-medium max-xl:text-[14px] text-base items-center">
          <li className="mt-[4px]">
            <Link
              href="/courses"
              className={`leading-[24px] hover:text-primary-500 duration-300 transition-all ${
                pathname === "/courses" ? "text-primary-500" : ""
              }`}
            >
              კურსები
            </Link>
          </li>
          <li className="mt-[4px]">
            <Link
              href="/offer"
              className={`leading-[24px] hover:text-primary-500 duration-300 transition-all ${
                pathname === "/offer" ? "text-primary-500" : ""
              }`}
            >
              შეთავაზება{" "}
            </Link>
          </li>
          <li className="mt-[4px]">
            <Link
              href="/blog"
              className={`leading-[24px] hover:text-primary-500 duration-300 transition-all ${
                pathname === "/blog" ? "text-primary-500" : ""
              }`}
            >
              ბლოგი
            </Link>
          </li>
          <li className="mt-[4px]">
            <Link
              href="/about"
              className={`leading-[24px] hover:text-primary-500 duration-300 transition-all ${
                pathname === "/about" ? "text-primary-500" : ""
              }`}
            >
              ჩვენს შესახებ
            </Link>
          </li>
          <li className="mt-[4px]">
            <Link
              href="/contact"
              className={`leading-[24px] hover:text-primary-500 duration-300 transition-all ${
                pathname === "/contact" ? "text-primary-500" : ""
              }`}
            >
              კონტაქტი
            </Link>
          </li>
          <li>
            <AlertDialog
              open={isRegistrationOpen}
              onOpenChange={safelySetRegistrationOpen}
            >
              <AlertDialogTrigger asChild>
                <Button className="w-[156px] h-[48px]">რეგისტრაცია</Button>
              </AlertDialogTrigger>
              <AlertDialogContent
                className={`p-0 overflow-hidden ${
                  isFullscreen
                    ? "rounded-none w-screen h-screen max-w-none max-h-none"
                    : "rounded-[20px] w-[95vw] max-w-[1220px]"
                } bg-white shadow-none animate-in fade-in-0 zoom-in-95 duration-300`}
                style={getDialogContentStyle()}
              >
                <AlertDialogTitle className="sr-only text-[#434A53]">
                  კურსზე რეგისტრაცია
                </AlertDialogTitle>
                <RegistrationForm />
              </AlertDialogContent>
            </AlertDialog>
          </li>
        </ul>

        <div className="lg:hidden">
          <button onClick={safelyToggleMobileMenu} className="p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden max-sm:max-w-[95%] mx-auto container mt-2 bg-white rounded-[16px] nav-shadow p-4 animate-in slide-in-from-top duration-300">
          <ul className="flex caps-text flex-col gap-3 font-medium">
            <li>
              <Link
                href="/courses"
                className={`block py-2 text-[14px] leading-[20px] ${
                  pathname === "/courses" ? "text-primary-500" : ""
                }`}
                onClick={handleLinkClick}
              >
                კურსები
              </Link>
            </li>
            <li>
              <Link
                href="/offer"
                className={`block py-2 text-[14px] leading-[20px] ${
                  pathname === "/offer" ? "text-primary-500" : ""
                }`}
                onClick={handleLinkClick}
              >
                შეთავაზება
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`block py-2 text-[14px] leading-[20px] ${
                  pathname === "/blog" ? "text-primary-500" : ""
                }`}
                onClick={handleLinkClick}
              >
                ბლოგი
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 text-[14px] leading-[20px] ${
                  pathname === "/about" ? "text-primary-500" : ""
                }`}
                onClick={handleLinkClick}
              >
                ჩვენს შესახებ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block py-2 text-[14px] leading-[20px] ${
                  pathname === "/contact" ? "text-primary-500" : ""
                }`}
                onClick={handleLinkClick}
              >
                კონტაქტი
              </Link>
            </li>
            <li className="py-2">
              <AlertDialog
                open={isRegistrationOpen}
                onOpenChange={safelySetRegistrationOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button className="w-full text-[14px]">რეგისტრაცია</Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                  className={`p-0 overflow-hidden ${
                    isFullscreen
                      ? "rounded-none w-screen h-screen max-w-none max-h-none"
                      : "rounded-[20px] w-[95vw] max-w-[1220px]"
                  } animate-in fade-in-0 zoom-in-95 duration-300`}
                  style={getDialogContentStyle()}
                >
                  <AlertDialogTitle className="sr-only">
                    კურსზე რეგისტრაცია
                  </AlertDialogTitle>
                  <RegistrationForm />
                </AlertDialogContent>
              </AlertDialog>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
