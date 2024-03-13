import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Anchor } from "@/components/ui/anchor";
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/ui/page";
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";

export default function TermsOfService() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <Page>
        <PageHeader>
          <PageTitle>Terms of Service</PageTitle>
          <PageDescription>Effective Date: March 9, 2024</PageDescription>
        </PageHeader>
        <PageContent>
          <TypographyP>
            Thank you for choosing Tucon! These Terms of Service
            (&quot;Terms&quot;) govern your use of our website and associated
            services (collectively, the &quot;Website&quot;). By accessing or
            using Tucon, you agree to be bound by these Terms. If you do not
            agree to these Terms, please do not use Tucon.
          </TypographyP>

          <TypographyH2 className="mt-10">1. Use of Tucon</TypographyH2>
          <TypographyP>
            1.1 Eligibility: You must be at least 18 years old to use Tucon. By
            using Tucon, you represent and warrant that you are at least 18
            years old.
          </TypographyP>
          <TypographyP>
            1.2 Account Registration: You may need to create an account to
            access certain features of Tucon. You are responsible for
            maintaining the confidentiality of your account credentials and for
            all activities that occur under your account.
          </TypographyP>
          <TypographyP>
            1.3 User Conduct: You agree to use Tucon for lawful purposes and in
            accordance with these Terms. You must not use Tucon in any way that
            violates applicable laws or regulations, infringes upon the rights
            of others, or is harmful to Tucon or its users.
          </TypographyP>

          <TypographyH2 className="mt-10">2. Tutoring Services</TypographyH2>
          <TypographyP>
            2.1 Connecting with Tutors: Tucon provides a platform to connect
            users with tutors for educational purposes. We do not employ or
            endorse any tutors listed on Tucon, and we are not responsible for
            the quality or outcomes of tutoring sessions.
          </TypographyP>
          <TypographyP>
            2.2 Payments: Users may be required to pay fees for tutoring
            services. Payment processing is not provided by Tucon and must be
            organized between the tutor and the student.
          </TypographyP>
          <TypographyP>
            2.3 Feedback: Users may provide feedback and ratings for tutors
            based on their experiences. You agree to provide honest and accurate
            feedback and to refrain from posting any content that is defamatory,
            obscene, or otherwise inappropriate.
          </TypographyP>

          <TypographyH2 className="mt-10">3. User Content</TypographyH2>
          <TypographyP>
            3.1 Ownership: You retain ownership of any content you submit or
            upload to Tucon, including profile information, messages, and
            feedback.
          </TypographyP>
          <TypographyP>
            3.2 License: By submitting content to Tucon, you grant Tucon a
            worldwide, non-exclusive, royalty-free license to use, reproduce,
            modify, adapt, publish, translate, distribute, and display such
            content in connection with the website.
          </TypographyP>
          <TypographyP>
            3.3 Prohibited Content: You must not submit any content that is
            illegal, infringes upon the rights of others, or is harmful,
            offensive, or inappropriate.
          </TypographyP>

          <TypographyH2 className="mt-10">
            4. Intellectual Property
          </TypographyH2>
          <TypographyP>
            All intellectual property rights in Tucon, including Tucon itself
            and its content, are owned by or licensed to us. You may not use,
            reproduce, modify, or distribute any of our intellectual property
            without our prior written consent.
          </TypographyP>

          <TypographyH2 className="mt-10">5. Privacy</TypographyH2>
          <TypographyP>
            Our collection and use of your information are governed by our{" "}
            <Anchor href="/legal/privacy-policy">Privacy Policy</Anchor>, which
            is incorporated into these Terms by reference. By using Tucon, you
            consent to the collection and use of your information as described
            in the Privacy Policy.
          </TypographyP>

          <TypographyH2 className="mt-10">
            6. Disclaimer of Warranties
          </TypographyH2>
          <TypographyP>
            Tucon is provided &quot;as is&quot; and &quot;as available&quot;
            without any warranties of any kind, whether express or implied. We
            do not guarantee the accuracy, reliability, or availability of Tucon
            or its content.
          </TypographyP>

          <TypographyH2 className="mt-10">
            7. Disclaimer of Warranties
          </TypographyH2>
          <TypographyP>
            To the fullest extent permitted by law, we will not be liable for
            any indirect, incidental, consequential, or punitive damages arising
            out of or in connection with your use of Tucon.
          </TypographyP>

          <TypographyH2 className="mt-10">8. Indemnification</TypographyH2>
          <TypographyP>
            You agree to indemnify and hold harmless Tucon and its affiliates,
            officers, directors, employees, and agents from any claims, losses,
            damages, liabilities, and expenses (including attorney&apos;s fees)
            arising out of or in connection with your use of Tucon or violation
            of these Terms.
          </TypographyP>

          <TypographyH2 className="mt-10">9. Changes to Terms</TypographyH2>
          <TypographyP>
            We may update these Terms from time to time to reflect changes in
            our practices or applicable laws. We will notify you of any material
            changes by posting the updated Terms within the website or by other
            means.
          </TypographyP>

          <TypographyH2 className="mt-10">10. Governing Law</TypographyH2>
          <TypographyP>
            These Terms are governed by and construed in accordance with the
            laws of the Province of Ontario. Any disputes arising out of or in
            connection with these Terms shall be subject to the exclusive
            jurisdiction of the courts of the Province of Ontario.
          </TypographyP>

          <TypographyH2 className="mt-10">11. Contact Us</TypographyH2>
          <TypographyP>
            If you have any questions or concerns about these Terms, please
            contact us at benjamin.sengupta@gmail.com. By using Tucon, you agree
            to abide by these Terms of Service.
          </TypographyP>
        </PageContent>
      </Page>
      <SiteFooter />
    </div>
  );
}
