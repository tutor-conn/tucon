import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/ui/page";
import { TypographyH2, TypographyP } from "@/components/ui/typography";

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <Page>
        <PageHeader>
          <PageTitle>Privacy Policy</PageTitle>
          <PageDescription>Effective Date: March 9, 2024</PageDescription>
        </PageHeader>
        <PageContent>
          <TypographyP>
            Thank you for choosing Tucon! This Privacy Policy describes how we
            collect, use, and disclose your information when you use our website
            and associated services.
          </TypographyP>

          <TypographyH2 className="mt-10">
            1. Information We Collect
          </TypographyH2>
          <TypographyP>
            1.1 Personal Information: When you register an account and create a
            profile with Tucon, we may collect personal information such as your
            name, email address, and phone number (if applicable).
          </TypographyP>
          <TypographyP>
            1.2 Usage Information: We may collect information about how you
            interact with our website, including the pages you visit, the
            features you use, and the actions you take.
          </TypographyP>
          <TypographyP>
            1.3 Device Information: We may collect information about the device
            you use to access our website, including the device type, operating
            system version, and unique device identifiers.
          </TypographyP>
          <TypographyP>
            1.4 Location Information: With your consent, we may collect and
            process information about your precise location using GPS, Wi-Fi, or
            cellular network information. This information is used to provide
            location-based services, such as finding tutors near you.
          </TypographyP>

          <TypographyH2 className="mt-10">
            2. How We Use Your Information
          </TypographyH2>
          <TypographyP>
            2.1 Providing Services: We use the information we collect to provide
            and improve our services, including connecting you with tutors and
            personalizing your experience.
          </TypographyP>
          <TypographyP>
            2.2 Communication: We may use your contact information to
            communicate with you about your account and updates to our services.
            We may also send you promotional emails and other marketing
            communications, which you can opt-out of at any time.
          </TypographyP>
          <TypographyP>
            2.3 Analytics: We may use aggregated and anonymized data for
            analytical purposes to understand how our website is used and to
            improve our services.
          </TypographyP>
          <TypographyP>
            2.4 Legal Compliance: We may use your information to comply with
            applicable laws, regulations, and legal processes, and to protect
            the rights, property, and safety of Tucon, our users, and others.
          </TypographyP>

          <TypographyH2 className="mt-10">
            3. How We Share Your Information
          </TypographyH2>
          <TypographyP>
            3.1 Service Providers: We may share your information with
            third-party service providers who help us operate our website, and
            provide other services.
          </TypographyP>
          <TypographyP>
            3.2 Tutors: When you request to connect with a tutor, we may share
            relevant information with them to facilitate the tutoring session.
          </TypographyP>
          <TypographyP>
            3.3 Legal Requirements: We may disclose your information in response
            to a subpoena, court order, or other legal request, or to comply
            with applicable laws and regulations.
          </TypographyP>
          <TypographyP>
            3.4 Business Transfers: If Tucon is involved in a merger,
            acquisition, or sale of assets, your information may be transferred
            as part of that transaction.
          </TypographyP>

          <TypographyH2 className="mt-10">4. Your Choices</TypographyH2>
          <TypographyP>
            4.1 Account Information: You can update or delete your account
            information at any time by accessing your account settings within
            the website.
          </TypographyP>
          <TypographyP>
            4.2 Location Information: You can control location tracking through
            your device settings or by adjusting the website&apos;s permissions.
          </TypographyP>
          <TypographyP>
            4.3 Marketing Communications: You can opt-out of receiving marketing
            communications from us by following the instructions provided in the
            communication or by contacting us directly.
          </TypographyP>

          <TypographyH2 className="mt-10">5. Security</TypographyH2>
          <TypographyP>
            We take reasonable measures to protect your information from
            unauthorized access, disclosure, alteration, or destruction.
            However, no method of transmission over the internet or electronic
            storage is 100% secure, so we cannot guarantee absolute security.
          </TypographyP>

          <TypographyH2 className="mt-10">
            6. Children&apos;s Privacy
          </TypographyH2>
          <TypographyP>
            Tucon is not intended for use by children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you believe that we may have collected information from a child
            under 13, please contact us immediately.
          </TypographyP>

          <TypographyH2 className="mt-10">
            7. Changes to This Privacy Policy
          </TypographyH2>
          <TypographyP>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or applicable laws. We will notify you of
            any material changes by posting the updated Privacy Policy within
            the website or by other means.
          </TypographyP>

          <TypographyH2 className="mt-10">8. Contact Us</TypographyH2>
          <TypographyP>
            If you have any questions or concerns about this Privacy Policy or
            our practices, please contact us at benjamin.sengupta@gmail.com. By
            using Tucon, you agree to the collection and use of your information
            as described in this Privacy Policy.
          </TypographyP>
        </PageContent>
      </Page>
      <SiteFooter />
    </div>
  );
}
