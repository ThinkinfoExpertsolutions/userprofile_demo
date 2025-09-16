import React, { useState } from 'react';
import { Spotlight } from '@/src/components/ui/Spotlight';
import { TextGenerateEffect } from "@/src/components/ui/TextGenerationEffect";
import Link from 'next/link'


const Privacy = () => {
  return (
    <div className="pb-20 pt-36 relative">
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="top-20 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <img src={"/Webfoxshield.png"} alt="Logo" className="fixed top-0 right-15 left-3 h-40 z-[900]" />

      <div className="flex justify-center relative my-20 z-10 -translate-y-40">
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
          <TextGenerateEffect className="text-center text-[40px] md:text-3xl lg:text-5xl" words="WEBFOXSHIELD" />
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            WE MAKE PRIVACY EASY.
          </p>

          {/* ================= */}
          <div className="flex justify-center items-center py-20">
      <div className="max-w-4xl w-full  rounded-lg border  border-[#74698d] shadow-2xl p-8 md:p-12">
        <p className="text-xl mb-6">Effective Date: [Insert Date]</p>

        <p className="mb-6">
          WebfoxShield ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our browser extension.
        </p>

        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-semibold mb-2">1. Information We Collect</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Browsing activity:</strong> To detect and prevent cyber threats, we may analyze URLs and website behavior in real time.</li>
              <li><strong>Device and browser details:</strong> To improve performance and compatibility, we may collect non-personal device and browser information.</li>
              <li><strong>User interactions with the extension:</strong> We may track feature usage to enhance user experience.</li>
            </ul>
            <p className="mt-2">We do not collect personally identifiable information (PII) unless explicitly provided by you.</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>Identifying and blocking potential cyber threats.</li>
              <li>Improving WebfoxShield’s security algorithms.</li>
              <li>Enhancing user experience and extension functionality.</li>
              <li>Compliance with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">3. Data Sharing and Security</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>We do not sell, trade, or rent your personal data to third parties.</li>
              <li>Any data collected is encrypted and stored securely.</li>
              <li>If data is shared with security research partners, it will be anonymized to protect your identity.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">4. Third-Party Services</h3>
            <p className="mb-4">
              WebfoxShield may integrate with third-party security databases for enhanced protection. These services have their own privacy policies, and we encourage users to review them.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">5. Your Choices and Rights</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>You can disable data collection in the extension settings.</li>
              <li>You can request the deletion of any stored data by contacting us.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">6. Updates to This Privacy Policy</h3>
            <p className="mb-4">
              We may update this policy periodically. Any changes will be reflected in the extension settings and on our website.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-2">7. Contact Us</h3>
            <p className="mb-4">If you have any questions regarding this policy, contact us at:</p>
            <p>Email: <a href="mailto:[Your Contact Email]" className="text-blue-500">[Your Contact Email]</a></p>
            <p>Website: <a href="[Your Website URL]" className="text-blue-500">[Your Website URL]</a></p>
          </section>
        </div>
      </div>
    </div>

            {/* ---------------------- */}
        </div>
      </div>
          
    </div>
  );
}

export default Privacy;



