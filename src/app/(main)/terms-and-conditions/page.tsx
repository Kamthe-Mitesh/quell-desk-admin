import {
  Cookie,
  UserCheck,
  AlertCircle,
  Shield,
  FileText,
  Mail,
  Gavel,
} from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-(--color-primary) md:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-zinc-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-zinc max-w-none">
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-lg leading-relaxed text-zinc-700">
              Welcome to Quell Desk. By accessing or using our complaint
              management platform, you agree to be bound by these Terms and
              Conditions. Please read them carefully before using our services.
            </p>
          </section>

          {/* Acceptance */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Acceptance of Terms
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              By creating an account and using Quell Desk, you acknowledge that
              you have read, understood, and agree to be bound by these Terms
              and Conditions, as well as our Privacy Policy. If you do not agree
              to these terms, please do not use our platform.
            </p>
            <div className="rounded-lg border border-(--color-primary)/20 bg-(--color-primary)/5 p-5">
              <p className="text-sm text-zinc-700">
                <strong>Important:</strong> Your continued use of Quell Desk
                constitutes acceptance of any updates or modifications to these
                terms.
              </p>
            </div>
          </section>

          {/* Account Registration */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Account Registration and Data Collection
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              To use Quell Desk, you must create an account by providing
              accurate and complete information. By registering, you consent to
              the collection and use of the following personal information:
            </p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <ul className="space-y-2 text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    <strong>Username:</strong> A unique identifier for your
                    account
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    <strong>Email Address:</strong> For account verification,
                    notifications, and communication
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    <strong>Phone Number:</strong> For urgent notifications and
                    account security purposes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    <strong>Flat Number:</strong> To identify your residence
                    within the society
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    <strong>Wing:</strong> To identify the building section of
                    your residence
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    <strong>Floor Number:</strong> To identify the floor level
                    of your residence
                  </span>
                </li>
              </ul>
            </div>
            <p className="mt-4 text-sm text-zinc-600">
              You agree to keep your account information accurate and
              up-to-date. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>
          </section>

          {/* Cookie Consent */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Cookie className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Cookie Usage and Consent
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              By using Quell Desk, you expressly consent to our use of cookies
              for authentication and session management purposes.
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-2 font-semibold text-(--color-primary)">
                  Essential Cookies
                </h3>
                <p className="mb-3 text-sm text-zinc-700">
                  We use secure, HTTP-only cookies to:
                </p>
                <ul className="space-y-1 text-sm text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-(--color-primary)">•</span>
                    <span>
                      Authenticate your identity and maintain your login session
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-(--color-primary)">•</span>
                    <span>Protect your account from unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-(--color-primary)">•</span>
                    <span>Enable core functionality of the platform</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-zinc-600">
                These cookies are essential for the platform to function and
                cannot be disabled. They do not track your activity outside of
                Quell Desk and are automatically deleted when you log out or
                after a period of inactivity.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Gavel className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Service Description
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              Quell Desk is a complaint management platform designed to help
              society residents submit, track, and manage complaints
              efficiently. Our services include:
            </p>
            <ul className="space-y-2 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>Submitting and tracking complaints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>Viewing society-wide complaints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>Managing your profile and residence information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Receiving notifications about complaint status updates
                </span>
              </li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                User Responsibilities
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              As a user of Quell Desk, you agree to:
            </p>
            <ul className="space-y-2 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Provide accurate and truthful information in your complaints
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Use the platform only for legitimate complaint management
                  purposes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Respect other users and maintain civil communication
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Not submit false, misleading, or malicious complaints
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Not attempt to access unauthorized areas of the platform or
                  other users&apos; accounts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>Comply with all applicable laws and regulations</span>
              </li>
            </ul>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                <strong>Warning:</strong> Violation of these responsibilities
                may result in suspension or termination of your account.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Data Security and Hosting
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              Your personal information is stored and processed on Amazon Web
              Services (AWS) infrastructure. By using Quell Desk, you consent
              to:
            </p>
            <ul className="space-y-2 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>Storage of your data on AWS servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Processing of your data as necessary to provide our services
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Our security measures including encryption in transit and at
                  rest
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-zinc-600">
              While we implement industry-standard security measures, no method
              of transmission over the internet or electronic storage is 100%
              secure. You acknowledge and accept the inherent risks of using
              online platforms.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-(--color-primary)">
              Intellectual Property
            </h2>
            <p className="text-zinc-700">
              All content, features, and functionality of Quell Desk, including
              but not limited to text, graphics, logos, and software, are the
              exclusive property of Quell Desk and are protected by copyright,
              trademark, and other intellectual property laws. You may not copy,
              modify, distribute, or create derivative works without our express
              written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-(--color-primary)">
              Limitation of Liability
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <p className="mb-3 text-zinc-700">
                Quell Desk is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, either express
                or implied. To the fullest extent permitted by law, we disclaim
                all warranties, including but not limited to:
              </p>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    Warranties of merchantability and fitness for a particular
                    purpose
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    Warranties that the service will be uninterrupted, timely,
                    or error-free
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-(--color-primary)">•</span>
                  <span>
                    Warranties regarding the accuracy or reliability of any
                    information obtained through the platform
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-zinc-700">
                We shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising out of or related to
                your use of Quell Desk.
              </p>
            </div>
          </section>

          {/* Account Termination */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-(--color-primary)">
              Account Termination
            </h2>
            <p className="mb-4 text-zinc-700">
              We reserve the right to suspend or terminate your account at our
              discretion, without notice, for conduct that we believe:
            </p>
            <ul className="space-y-2 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>Violates these Terms and Conditions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>
                  Is harmful to other users, third parties, or our business
                  interests
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-(--color-primary)">•</span>
                <span>Violates any applicable laws or regulations</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-zinc-600">
              You may also terminate your account at any time by contacting us
              at the email address provided below.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-(--color-primary)">
              Changes to These Terms
            </h2>
            <p className="text-zinc-700">
              We reserve the right to modify these Terms and Conditions at any
              time. We will notify you of any material changes by posting the
              updated terms on this page and updating the &quot;Last
              updated&quot; date. Your continued use of Quell Desk after such
              modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-(--color-primary)">
              Governing Law
            </h2>
            <p className="text-zinc-700">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of India, without regard to its conflict
              of law provisions. Any disputes arising under these terms shall be
              subject to the exclusive jurisdiction of the courts located in
              India.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Mail className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Contact Us
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <div className="rounded-lg border border-(--color-primary)/30 bg-(--color-primary)/5 p-6">
              <p className="text-zinc-700">
                <strong>Email:</strong> legal@quelldesk.com
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                We will respond to your inquiry within 7 business days.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex items-center justify-center gap-4 border-t border-gray-200 pt-8 text-sm">
          <Link
            href={ROUTES.DASHBOARD}
            className="text-(--color-primary) hover:text-(--color-primary) transition-colors"
          >
            Back to Dashboard
          </Link>
          <span className="text-zinc-300">•</span>
          <Link
            href={ROUTES.PRIVACY_POLICIES}
            className="text-(--color-primary) hover:text-(--color-primary) transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
