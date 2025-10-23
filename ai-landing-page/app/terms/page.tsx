import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: December 2024</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                <p>
                  By accessing and using our prediction market services, you accept and agree to be bound by the terms and provision of
                  this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
                <p className="mb-4">
                  NOMO provides decentralized prediction market services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>BNB-based prediction markets</li>
                  <li>AI-powered market insights and analytics</li>
                  <li>Decentralized trading infrastructure</li>
                  <li>Smart contract-based settlement systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
                <p className="mb-4">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate wallet information and trading data</li>
                  <li>Use our services in compliance with applicable laws and regulations</li>
                  <li>Not engage in market manipulation or fraudulent activities</li>
                  <li>Maintain the security of your wallet and private keys</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p>
                  Our liability for any claims arising from the use of our services shall not exceed the amount paid by
                  you for the specific service giving rise to the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p>
                  For questions about these Terms of Service, contact us at{" "}
                  <a href="mailto:legal@nomo.market" className="text-blue-400 hover:text-blue-300">
                    legal@nomo.market
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
