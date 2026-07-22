import Layout from "@/components/Layout";
import EnquiryForm from "@/components/EnquiryForm";
import { company } from "@/data/site";

// IMPORT CONTACT BACKGROUND IMAGE
import contactBg from "@/assets/contact.webp";

export default function Contact() {
  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 text-brand-foreground">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${contactBg})`,
          }}
        />

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-950/35" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10" />

        {/* CONTENT */}
        <div className="container-x relative">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Contact
          </p>

          <h1 className="mt-3 font-display text-5xl md:text-6xl">
            Let's start the <span className="text-gold">conversation</span>
          </h1>

          <div className="mt-4 gold-divider" />

          <p className="mt-6 max-w-2xl text-brand-foreground/80">
            Whether you need ISO consultancy, a security audit or a training
            program for your team, our specialists are ready to help.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="container-x grid gap-10 py-20 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          {[
            // ["Address", company.address],
          [
  "Address",
  <>
    {/* Chennai Office */}
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-bold text-foreground">
        Chennai
      </h3>

      <p className="mt-2 text-sm leading-7 text-foreground">
        No 58, Gandhi Street, Rajaji Nagar, Tiruvottiyur,
        <br />
        Chennai, Tamil Nadu 600019
      </p>
    </div>

    {/* Dubai Office */}
    <div className="mt-4 rounded-lg border border-border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-bold text-foreground">
        Dubai
      </h3>

      {/* <p className="mt-2 text-sm leading-7 text-foreground">
        IFZA Business Park — Building A1, DDP, Dubai Silicon Oasis,
        <br />
        PO Box 342001, Dubai, United Arab Emirates
      </p> */}
      <p className="mt-2 text-sm leading-7 text-foreground">
  IFZA Business Park — Building A1, DDP,
  <br />
  Dubai Silicon Oasis, PO Box 342001,
  <br />
  Dubai, United Arab Emirates
</p>
    </div>
  </>,
],
            ["Phone", `${company.phone}`],
            ["Email", company.email],
            ["Hours", "Mon – Sat · 9:30 AM – 7:00 PM IST"],
          ].map(([t, d]) => (
            // <div
            //   key={t}
            //   className="rounded-xl border border-border bg-card p-6"
            // >
            <div
  key={t}
  className="rounded-xl border border-border bg-card p-8"
>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                {t}
              </p>

              {/* <p className="mt-2 text-sm text-foreground">
                {d}
              </p> */}
              <div className="mt-3 text-sm text-foreground">
  {d}
</div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <EnquiryForm />
        </div>
      </section>

      {/* MAP */}
      <section className="container-x pb-24">
        <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
          <iframe
            title="Hawksberg International location"
            src="https://www.google.com/maps?q=Tiruvottiyur,Chennai&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </Layout>
  );
}