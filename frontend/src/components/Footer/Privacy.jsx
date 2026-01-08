import React from 'react'
import { useEffect } from 'react';

const Privacy = () => {
    useEffect(()=>{
      window.scrollTo({top:0,behavior:'smooth'})
    },[])
    
  return (
    <div>
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-4xl mx-auto  shadow-xl rounded-2xl p-10 border border-blue-100">
          {/* Header */}
          <h1 className="text-center font-poppins text-3xl md:text-4xl font-bold text-blue-700">
            <span className="text-orange-400 text-5xl">P</span>rivacy Policy
          </h1>

          <p className="text-center text-gray-500 text-sm mt-2">
            Last updated:{" "}
            <span className="font-semibold">October 24, 2025</span>
          </p>

          {/* Intro */}
          <div className="font-outfit text-gray-700 text-base leading-relaxed mt-10 space-y-4">
            <p>
              Welcome to{" "}
              <span className="font-semibold text-blue-600">
                Doctor Booking App – AroggoLink
              </span>
              . Your privacy is very important to us. This Privacy Policy
              explains how we collect, use, and protect your personal
              information when you use our app.
            </p>
          </div>

          {/* Main Content */}
          <ol className="list-decimal text-gray-700 text-base font-outfit pl-5 mt-8 space-y-8">
            {/* 1 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">
                Information We Collect
              </p>
              <p>We may collect the following information:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Personal Information: Name, email, phone number, date of
                  birth.
                </li>
                <li>
                  Appointment Details: Selected doctor, booking date/time,
                  medical issue (if provided).
                </li>
                <li>
                  Device Information: Device type, operating system, and unique
                  identifiers.
                </li>
                <li>
                  Usage Data: How you use the app, pages visited, and
                  interaction logs.
                </li>
              </ul>
            </li>

            {/* 2 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">
                How We Use Your Information
              </p>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Book and manage doctor appointments.</li>
                <li>Send booking confirmations and reminders.</li>
                <li>Improve app functionality and user experience.</li>
                <li>Provide customer support.</li>
                <li>Ensure security and prevent fraud.</li>
              </ul>
            </li>

            {/* 3 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">
                Data Storage and Security
              </p>
              <p>
                We store data securely using industry-standard protection. Your
                personal information is not shared with third parties, except:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>When required by law.</li>
                <li>
                  To provide essential app services (e.g., SMS/email
                  notifications via trusted providers).
                </li>
              </ul>
            </li>

            {/* 4 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">
                Third-Party Services
              </p>
              <p className="pl-4 mt-1">
                Our app may use third-party services (e.g., Google Analytics,
                Firebase, Brevo email/SMS) that collect information as per their
                own privacy policies. Please review their policies for more
                details.
              </p>
            </li>

            {/* 5 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">Your Rights</p>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access or update your personal information.</li>
                <li>Request deletion of your data.</li>
                <li>Withdraw consent at any time by contacting us.</li>
              </ul>
            </li>

            {/* 6 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">
                Children’s Privacy
              </p>
              <p className="pl-4">
                Our app is not intended for children under 13. We do not
                knowingly collect data from minors.
              </p>
            </li>

            {/* 7 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">
                Changes to This Policy
              </p>
              <p className="pl-4">
                We may update this Privacy Policy periodically. The updated
                version will be posted within the app and take effect
                immediately.
              </p>
            </li>

            {/* 8 */}
            <li>
              <p className="font-semibold text-blue-700 mb-1">Contact Us</p>
              <div className="pl-4 space-y-1">
                <p>
                  If you have questions or concerns about this Privacy Policy,
                  please contact us:
                </p>
                <p>
                  📧 <span className="font-medium">Email:</span>{" "}
                  aroggo.link@gmail.com
                </p>
                <p>
                  🏢{" "}
                  <span className="font-medium">Developer/Company Name:</span>{" "}
                  AroggoLink
                </p>
              </div>
            </li>
          </ol>

          {/* Footer note */}
          <div className="mt-12 border-t pt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AroggoLink. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy