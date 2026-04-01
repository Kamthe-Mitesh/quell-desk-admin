import {
  Cookie,
  Database,
  Lock,
  Mail,
  Eye,
  Users,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-(--color-primary) md:text-5xl">
            Privacy Policy
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
              At Quell Desk, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, store, and protect your data
              when you use our complaint management platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Database className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Information We Collect
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              We collect the following personal information when you register
              and use Quell Desk:
            </p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <ul className="space-y-2 text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 (--color-primary">•</span>
                  <span>
                    <strong>Username:</strong> To identify your account
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 (--color-primary">•</span>
                  <span>
                    <strong>Email Address:</strong> For account verification and
                    communication
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 (--color-primary">•</span>
                  <span>
                    <strong>Phone Number:</strong> For urgent notifications and
                    account security
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 (--color-primary">•</span>
                  <span>
                    <strong>Residence Information:</strong> Flat number, wing,
                    and floor number to verify your society membership
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Cookie Usage */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Cookie className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Cookie Usage
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              Quell Desk uses cookies to provide essential functionality for
              authentication and session management:
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border border-(--color-primary)/20 bg-(--color-primary)/5 p-5">
                <h3 className="mb-2 font-semibold text-(--color-primary)">
                  Authentication Cookies
                </h3>
                <p className="text-sm text-zinc-700">
                  We use secure, HTTP-only cookies to maintain your login
                  session. These cookies are essential for the platform to
                  function properly and cannot be disabled. They are
                  automatically deleted when you log out.
                </p>
              </div>
              <p className="text-sm text-zinc-600">
                By using Quell Desk, you consent to our use of cookies for
                authentication purposes. These cookies do not track your
                browsing activity outside of our platform.
              </p>
            </div>
          </section>

          {/* Data Storage */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Lock className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Data Storage and Security
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              Your personal information is stored securely on Amazon Web
              Services (AWS) infrastructure:
            </p>
            <ul className="space-y-3 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  All data is encrypted in transit using industry-standard
                  TLS/SSL protocols
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  Data at rest is encrypted using AWS encryption services
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  We implement strict access controls to ensure only authorized
                  personnel can access your data
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  Regular security audits and updates are performed to maintain
                  the highest security standards
                </span>
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Eye className="h-6 w-6 text(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                How We Use Your Information
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              We use your personal information solely for the following
              purposes:
            </p>
            <ul className="space-y-2 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>To create and manage your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>To process and track your complaints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  To send you notifications about your complaints and account
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>To verify your residence in the society</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>To improve our services and user experience</span>
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Users className="h-6 w-6 text(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Data Sharing and Disclosure
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              We do not sell, trade, or rent your personal information to third
              parties. Your data may be shared only in the following limited
              circumstances:
            </p>
            <ul className="space-y-2 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  <strong>Within Your Society:</strong> Your complaints and
                  residence information may be visible to society administrators
                  and relevant personnel
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect our legal rights
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text(--color-primary)">•</span>
                <span>
                  <strong>Service Providers:</strong> With AWS and other trusted
                  service providers who help us operate the platform, under
                  strict confidentiality agreements
                </span>
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-6 w-6 text-(--color-primary)" />
              <h2 className="text-2xl font-semibold text-(--color-primary)">
                Your Rights
              </h2>
            </div>
            <p className="mb-4 text-zinc-700">
              You have the following rights regarding your personal data:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-1 font-semibold text-(--color-primary)">
                  Access and Update
                </h3>
                <p className="text-sm text-zinc-600">
                  You can view and update your personal information at any time
                  through your profile page.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-1 font-semibold text-(--color-primary)">
                  Data Deletion
                </h3>
                <p className="text-sm text-zinc-600">
                  You can request deletion of your account and associated data
                  by contacting us.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-1 font-semibold text-(--color-primary)">
                  Data Portability
                </h3>
                <p className="text-sm text-zinc-600">
                  You can request a copy of your personal data in a structured,
                  machine-readable format.
                </p>
              </div>
            </div>
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
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us:
            </p>
            <div className="rounded-lg border border-(--color-primary)/30 bg-(--color-primary)/5 p-6">
              <p className="text-zinc-700">
                <strong>Email:</strong> privacy@quelldesk.com
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                We will respond to your inquiry within 7 business days.
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-(--color-primary)">
              Changes to This Policy
            </h2>
            <p className="text-zinc-700">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new Privacy
              Policy on this page and updating the &quot;Last updated&quot;
              date. Your continued use of Quell Desk after any changes
              constitutes your acceptance of the updated policy.
            </p>
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
            href={ROUTES.TERMS_AND_CONDITIONS}
            className="text-(--color-primary) hover:text-(--color-primary) transition-colors"
          >
            Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
