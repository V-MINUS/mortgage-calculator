"use client"

import * as React from "react"
import { useState } from "react"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

export default function GrantsPage() {
  // First Home Scheme Eligibility
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(true)
  const [isFreshStartApplicant, setIsFreshStartApplicant] = useState(false)
  const [propertyPrice, setPropertyPrice] = useState(300000)
  const [isSelfBuild, setIsSelfBuild] = useState(false)
  const [hasDeposit, setHasDeposit] = useState(true)
  const [hasMortgageApproval, setHasMortgageApproval] = useState(true)
  const [isNewBuild, setIsNewBuild] = useState(true)
  
  // Help to Buy Eligibility
  const [hasPaidIncomeTax, setHasPaidIncomeTax] = useState(true)
  const [willLiveInProperty, setWillLiveInProperty] = useState(true)
  const [hasSeventyPercentMortgage, setHasSeventyPercentMortgage] = useState(true)
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  // Determine eligibility based on criteria
  const isHelpToBuyEligible = 
    isFirstTimeBuyer && 
    isNewBuild && 
    hasPaidIncomeTax && 
    willLiveInProperty && 
    hasSeventyPercentMortgage
  
  const isFirstHomeSchemeEligible = 
    (isFirstTimeBuyer || isFreshStartApplicant) && 
    hasDeposit && 
    hasMortgageApproval &&
    (isNewBuild || isSelfBuild)
  
  // Calculate potential HTB refund (max 30K or 10% of property value)
  const helpToBuyAmount = Math.min(30000, propertyPrice * 0.10)
  
  // Calculate potential FHS equity (simplified calculation - actual would depend on location)
  const firstHomeSchemeEquity = Math.min(100000, propertyPrice * 0.30)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        First-Time Buyer Grant Eligibility Checker
      </h1>
      
      <div className="mb-8">
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Check if you might be eligible for Irish government first-time buyer schemes. This is a simplified checker - please consult official sources for definitive eligibility.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Property Details */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Property Details</h2>
            
            {/* Property Type */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </Label>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="new-build" 
                  checked={isNewBuild} 
                  onCheckedChange={(_checked: boolean) => {
                    setIsNewBuild(true)
                    setIsSelfBuild(false)
                  }}
                />
                <Label htmlFor="new-build">New Build (Developer)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="self-build" 
                  checked={isSelfBuild} 
                  onCheckedChange={(_checked: boolean) => {
                    setIsSelfBuild(true)
                    setIsNewBuild(false)
                  }}
                />
                <Label htmlFor="self-build">Self-Build</Label>
              </div>
            </div>
            
            {/* Property Price */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Property Price: {formatCurrency(propertyPrice)}
              </Label>
              <Slider
                min={100000}
                max={750000}
                step={10000}
                value={[propertyPrice]}
                onValueChange={(value) => setPropertyPrice(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>€100k</span>
                <span>€750k</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Applicant Details */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Applicant Details</h2>
            
            {/* First-time Buyer Status */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Buyer Status
              </Label>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="first-time" 
                  checked={isFirstTimeBuyer} 
                  onCheckedChange={(_checked: boolean) => {
                    setIsFirstTimeBuyer(true)
                    setIsFreshStartApplicant(false)
                  }}
                />
                <Label htmlFor="first-time">First-Time Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fresh-start" 
                  checked={isFreshStartApplicant} 
                  onCheckedChange={(_checked: boolean) => {
                    setIsFreshStartApplicant(true)
                    setIsFirstTimeBuyer(false)
                  }}
                />
                <Label htmlFor="fresh-start">Fresh Start Applicant</Label>
              </div>
            </div>
            
            {/* Other Requirements */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Other Requirements
              </Label>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="deposit" 
                  checked={hasDeposit} 
                  onCheckedChange={(checked: boolean | 'indeterminate') => setHasDeposit(!!checked)}
                />
                <Label htmlFor="deposit">Have minimum deposit (10%)</Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="mortgage" 
                  checked={hasMortgageApproval} 
                  onCheckedChange={(checked: boolean | 'indeterminate') => setHasMortgageApproval(!!checked)}
                />
                <Label htmlFor="mortgage">Have mortgage approval</Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="seventy-percent" 
                  checked={hasSeventyPercentMortgage} 
                  onCheckedChange={(checked: boolean | 'indeterminate') => setHasSeventyPercentMortgage(!!checked)}
                />
                <Label htmlFor="seventy-percent">Mortgage is at least 70% of property value</Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="tax" 
                  checked={hasPaidIncomeTax} 
                  onCheckedChange={(checked: boolean | 'indeterminate') => setHasPaidIncomeTax(!!checked)}
                />
                <Label htmlFor="tax">Paid income tax in Ireland in last 4 years</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="live-in" 
                  checked={willLiveInProperty} 
                  onCheckedChange={(checked: boolean | 'indeterminate') => setWillLiveInProperty(!!checked)}
                />
                <Label htmlFor="live-in">Will live in property for at least 5 years</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-center text-gray-700">Eligibility Results</h2>
        
        {/* Help to Buy Scheme */}
        <div className={`p-6 rounded-lg border-l-4 ${isHelpToBuyEligible ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
          <h3 className="text-lg font-semibold mb-3">{isHelpToBuyEligible ? '✓' : '✗'} Help to Buy Scheme</h3>
          
          {isHelpToBuyEligible ? (
            <div className="space-y-2">
              <p className="text-green-700">
                Based on your answers, you may be eligible for the Help to Buy scheme.
              </p>
              <p>
                You could potentially receive up to {formatCurrency(helpToBuyAmount)} as an income tax refund to help with your deposit.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This is a tax refund of income tax and DIRT you've paid in the four years before applying, up to a maximum of €30,000 or 10% of the property price, whichever is lower.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-700">
                Based on your answers, you may not be eligible for the Help to Buy scheme.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                To be eligible, you must be a first-time buyer purchasing a new build property, have paid income tax in Ireland, plan to live in the property, and have a mortgage of at least 70% of the property value.
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <a 
              href="https://www.revenue.ie/en/property/help-to-buy-incentive/index.aspx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Official Help to Buy Website (Revenue.ie) →
            </a>
          </div>

          <details className="mt-4 bg-blue-50 p-4 rounded-md">
            <summary className="font-medium text-blue-700 cursor-pointer">Detailed Guide to the Help to Buy Scheme</summary>
            <div className="mt-3 text-sm space-y-3">
              <h4 className="font-semibold">Overview and Purpose</h4>
              <p>
                The Help to Buy Scheme provides a refund of Income Tax and Deposit Interest Retention Tax (DIRT) 
                paid over the four years preceding your application, helping first-time buyers overcome the deposit barrier.
              </p>
              
              <h4 className="font-semibold mt-3">Key Benefits</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Refund of up to €30,000 or 10% of the purchase price (whichever is lower)</li>
                <li>Directly applied to reduce your deposit requirement</li>
                <li>Available for newly built or self-built properties</li>
              </ul>
              
              <h4 className="font-semibold mt-3">Eligibility Requirements</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must be a first-time buyer (all applicants if joint application)</li>
                <li>You must have paid Income Tax/DIRT in Ireland in the previous four years</li>
                <li>You must secure a mortgage for at least 70% of the property's value</li>
                <li>The property must be newly built and purchased between Jan 2017 and Dec 2029</li>
                <li>You must live in the property as your main home for at least five years</li>
              </ul>
              
              <h4 className="font-semibold mt-3">Application Process</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Register through Revenue's MyAccount or ROS portal</li>
                <li>Declare your tax years for refund calculation</li>
                <li>Submit supporting documents (mortgage approval, purchase contract)</li>
                <li>Verification by Revenue-approved contractor or solicitor</li>
                <li>Refund processed directly to reduce your deposit</li>
              </ol>
              
              <h4 className="font-semibold mt-3">Important Conditions</h4>
              <p>
                The property must be your primary residence for at least 5 years. Failure to meet this condition 
                may trigger a clawback of the refund. The scheme can't be combined with certain other housing supports 
                like the Local Authority Affordable Purchase Scheme.
              </p>
              
              <p className="text-xs text-gray-500 mt-3">
                For comprehensive details about eligibility, application process, and terms, please consult the 
                official Revenue Help to Buy resources.
              </p>
            </div>
          </details>
        </div>
        
        {/* First Home Scheme */}
        <div className={`p-6 rounded-lg border-l-4 ${isFirstHomeSchemeEligible ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
          <h3 className="text-lg font-semibold mb-3">{isFirstHomeSchemeEligible ? '✓' : '✗'} First Home Scheme</h3>
          
          {isFirstHomeSchemeEligible ? (
            <div className="space-y-2">
              <p className="text-green-700">
                Based on your answers, you may be eligible for the First Home Scheme.
              </p>
              <p>
                You could potentially receive up to {formatCurrency(firstHomeSchemeEquity)} in shared equity to help bridge the gap between your mortgage, deposit, and the property price.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                The First Home Scheme is a shared equity scheme where the Government may take a stake in your property to help make it more affordable.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-700">
                Based on your answers, you may not be eligible for the First Home Scheme.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                To be eligible, you must be a first-time buyer or fresh start applicant, purchasing a new build or self-build property, and have mortgage approval and a minimum deposit.
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <a 
              href="https://www.firsthomescheme.ie/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Official First Home Scheme Website →
            </a>
          </div>

          <details className="mt-4 bg-blue-50 p-4 rounded-md">
            <summary className="font-medium text-blue-700 cursor-pointer">Detailed Guide to the First Home Scheme</summary>
            <div className="mt-3 text-sm space-y-3">
              <h4 className="font-semibold">Shared Equity Model</h4>
              <p>
                The FHS contributes a proportion of the purchase price by taking an ownership stake in your property. 
                The scheme can contribute up to 30% of the property price (or up to 20% if used with Help to Buy).
              </p>
              
              <h4 className="font-semibold mt-3">Key Features</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>The equity percentage remains fixed, but its monetary value changes with property market fluctuations</li>
                <li>You must provide a minimum 10% deposit and secure a mortgage for the remaining balance</li>
                <li>From the sixth year onwards, a service charge applies</li>
                <li>You must maintain the property as your principal private residence</li>
              </ul>
              
              <h4 className="font-semibold mt-3">Repayment Conditions</h4>
              <p>
                Repayment of the scheme's contribution is triggered when you sell the property, if there's a significant change 
                in circumstance, or if you breach the scheme's conditions. The repayment amount is calculated based on the 
                current market value of your home and the percentage share originally acquired by the FHS.
              </p>
              
              <h4 className="font-semibold mt-3">Integration with Other Schemes</h4>
              <p>
                The FHS can be combined with the Help to Buy scheme for new builds and self-builds (subject to limits), but 
                cannot be used with the Local Authority Affordable Purchase Scheme or the Home Loan program.
              </p>
              
              <p className="text-xs text-gray-500 mt-3">
                For comprehensive details about eligibility, application process, and legal framework, please consult the 
                official First Home Scheme resources.
              </p>
            </div>
          </details>
        </div>
        
        {/* Local Authority Home Loan */}
        <div className="p-6 rounded-lg border-l-4 border-blue-300 bg-blue-50">
          <h3 className="text-lg font-semibold mb-3">Local Authority Home Loan</h3>
          <p>
            First-time buyers and Fresh Start applicants may also be eligible for a Local Authority Home Loan if they meet certain income requirements.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This is a Government-backed mortgage for first-time buyers and fresh start applicants with specific income limits.
          </p>
          <div className="mt-4">
            <a 
              href="https://localauthorityhomeloan.ie/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Official Local Authority Home Loan Website →
            </a>
          </div>
          
          <details className="mt-4 bg-white p-4 rounded-md">
            <summary className="font-medium text-blue-700 cursor-pointer">Detailed Guide to the Local Authority Home Loan</summary>
            <div className="mt-3 text-sm space-y-3">
              <h4 className="font-semibold">Overview and Purpose</h4>
              <p>
                The Local Authority Home Loan is a government-backed mortgage designed for first-time buyers and "fresh start"
                applicants who may struggle to secure adequate finance from commercial lenders.
              </p>
              
              <h4 className="font-semibold mt-3">Key Benefits</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Competitive fixed interest rates (typically around 4.00%-4.05%)</li>
                <li>Finance up to 90% of the property's market value</li>
                <li>Available for purchasing, building, or renovating homes</li>
                <li>Option for "fresh start" applicants (after divorce, separation, insolvency)</li>
              </ul>
              
              <h4 className="font-semibold mt-3">Eligibility Requirements</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>First-time buyer or fresh start applicant</li>
                <li>Age between 18-70 years</li>
                <li>Single applicants: gross annual income below €70,000</li>
                <li>Joint applicants: combined gross income below €85,000</li>
                <li>Primary applicant: at least 2 years continuous employment</li>
                <li>Secondary applicant: at least 1 year continuous employment</li>
                <li>Minimum deposit of 10% of the property's market value</li>
                <li>Proof of insufficient mortgage offers from at least two regulated financial institutions</li>
                <li>Satisfactory credit history verified by the Central Credit Register</li>
              </ul>
              
              <h4 className="font-semibold mt-3">Loan Terms and Conditions</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maximum property value varies by region: €360,000 for Dublin/Kildare/Wicklow; €330,000 for Cork/Galway/Louth/Meath; lower thresholds for other regions</li>
                <li>Mortgage Protection Insurance (MPI) is mandatory</li>
                <li>Monthly repayments must not exceed one-third of household net income</li>
                <li>Property must serve as the applicant's primary residence</li>
                <li>Cannot be used with some other homeownership schemes (e.g., First Home Scheme) unless explicitly permitted</li>
              </ul>
              
              <h4 className="font-semibold mt-3">Application Process</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Obtain an application form online or from your local authority office</li>
                <li>Submit detailed personal and financial information</li>
                <li>Provide evidence of insufficient mortgage offers from two regulated lenders</li>
                <li>Include supporting documents (credit reports, property details, etc.)</li>
                <li>Applications are typically reviewed within 6-8 weeks</li>
                <li>Once approved, the loan offer is valid for approximately six months</li>
              </ol>
              
              <p className="text-xs text-gray-500 mt-3">
                For comprehensive details about eligibility criteria, application process, and regional property value limits,
                please consult the official Local Authority Home Loan website.
              </p>
            </div>
          </details>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Disclaimer</h4>
        <p className="text-xs text-gray-500">
          This eligibility checker provides general guidance only and is not a guarantee of eligibility. Actual eligibility is determined by the relevant authorities based on your complete application. Rules, maximum amounts, and conditions may change. Always consult the official websites or a mortgage advisor for the most up-to-date information.
        </p>
      </div>
      
      {/* Back to Calculator */}
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Mortgage Calculator
        </Link>
      </div>
    </div>
  )
}
