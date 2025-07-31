"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link"

export default function MortgageCalculator() {
  const [mortgageAmount, setMortgageAmount] = React.useState(350000)
  const [overpaymentPercent, setOverpaymentPercent] = React.useState(100)
  const [overpaymentYears, setOverpaymentYears] = React.useState(5)
  const [termYears, setTermYears] = React.useState(20)
  const [deposit, setDeposit] = React.useState(30000)
  const [paymentFrequency, setPaymentFrequency] = React.useState('monthly') // 'monthly', 'fortnightly', or 'weekly'

  const rate_annual = 0.031

  const calculateMortgage = () => {
    // Loan amount is mortgageAmount minus deposit
    const loanAmount = mortgageAmount - deposit
    if (loanAmount <= 0) {
      return {
        years: 0,
        rem_months: 0,
        total_paid: 0,
        interest_paid: 0,
        interest_saved: 0,
        payment_amount: 0,
        overpay_amount: 0,
        standard_total: 0,
        standard_interest: 0,
        loanAmount: 0
      }
    }

    // Daily interest rate - banks calculate interest daily
    const rate_daily = rate_annual / 365
    
    let periods_per_year: number
    let days_between_payments: number
    
    if (paymentFrequency === 'weekly') {
      periods_per_year = 52
      days_between_payments = 7 // 7 days between payments
    } else if (paymentFrequency === 'fortnightly') {
      periods_per_year = 26
      days_between_payments = 14 // 14 days between payments
    } else { // monthly
      periods_per_year = 12
      days_between_payments = 30.4375 // Average days in a month (365.25/12)
    }

    // Total number of payments over the mortgage term
    const n_periods = termYears * periods_per_year
    
    // Calculate payment amount using daily interest compounding
    // Formula modified to account for daily interest accrual
    // For standard monthly payment calculation
    const effective_rate = Math.pow(1 + rate_daily, days_between_payments) - 1
    const payment_standard = loanAmount * effective_rate / (1 - Math.pow(1 + effective_rate, -n_periods))
    
    // Calculate monthly payment regardless of selected frequency for baseline comparison
    const monthly_periods = termYears * 12
    const monthly_days = 30.4375 // Average days in a month
    const monthly_effective_rate = Math.pow(1 + rate_daily, monthly_days) - 1
    const monthly_payment = loanAmount * monthly_effective_rate / (1 - Math.pow(1 + monthly_effective_rate, -monthly_periods))
    
    // Bank of Ireland overpayment rules: 10% of monthly payment or €65, whichever is greater (for fixed rate)
    const max_monthly_overpay = Math.max(0.10 * monthly_payment, 65)
    const max_overpay_per_year = max_monthly_overpay * 12
    const actual_overpay_per_year = max_overpay_per_year * (overpaymentPercent / 100)
    const overpay_per_period = actual_overpay_per_year / periods_per_year

    // Amortization with overpayments using daily interest calculations
    let principal = loanAmount
    let periods = 0
    let total_paid = 0
    
    // For comparisons - standard mortgage with same payment frequency but no overpayments
    let standard_principal = loanAmount
    let standard_periods = 0
    let standard_total_paid = 0
    
    // For monthly base comparison - to show savings compared to monthly payments
    let monthly_base_principal = loanAmount
    let monthly_base_periods = 0
    let monthly_base_total_paid = 0
    const monthly_base_payment = monthly_payment

    // Calculate both scenarios in parallel for accurate comparison
    while (principal > 0.01 && periods < 4000) { // Increased max to handle longer-term calculations
      // Daily interest accrual over the payment period
      const interest_accrued = principal * (Math.pow(1 + rate_daily, days_between_payments) - 1)
      let payment_total

      // Apply overpayments only for the specified years
      if (periods < overpaymentYears * periods_per_year) {
        payment_total = payment_standard + overpay_per_period
      } else {
        payment_total = payment_standard
      }

      const principal_payment = payment_total - interest_accrued

      if (principal_payment <= 0) break

      if (principal_payment >= principal) {
        // Final payment
        total_paid += principal + interest_accrued
        principal = 0
      } else {
        principal -= principal_payment
        total_paid += payment_total
      }

      // Calculate standard mortgage without overpayments for comparison
      if (standard_principal > 0.01 && standard_periods < termYears * periods_per_year) {
        const standard_interest = standard_principal * (Math.pow(1 + rate_daily, days_between_payments) - 1)
        const standard_principal_payment = payment_standard - standard_interest
        
        if (standard_principal_payment <= 0) break
        
        if (standard_principal_payment >= standard_principal) {
          standard_total_paid += standard_principal + standard_interest
          standard_principal = 0
        } else {
          standard_principal -= standard_principal_payment
          standard_total_paid += payment_standard
        }
        
        standard_periods++
      }
      
      // Calculate baseline monthly payment scenario for comparison
      // This stays the same regardless of selected payment frequency
      if (monthly_base_principal > 0.01 && monthly_base_periods < termYears * 12) {
        // Monthly interest calculation
        const monthly_interest = monthly_base_principal * (Math.pow(1 + rate_daily, monthly_days) - 1)
        const monthly_principal_payment = monthly_base_payment - monthly_interest
        
        if (monthly_principal_payment <= 0) break
        
        if (monthly_principal_payment >= monthly_base_principal) {
          monthly_base_total_paid += monthly_base_principal + monthly_interest
          monthly_base_principal = 0
        } else {
          monthly_base_principal -= monthly_principal_payment
          monthly_base_total_paid += monthly_base_payment
        }
        
        monthly_base_periods++
      }

      periods++
    }

    const years = Math.floor(periods / periods_per_year)
    const rem_periods = periods % periods_per_year
    const rem_months = paymentFrequency === 'weekly' ? Math.round(rem_periods / 4.33) : rem_periods
    const interest_paid = total_paid - loanAmount

    // Use calculated values for standard mortgage comparison
    const standard_interest = standard_total_paid - loanAmount
    
    // Calculate monthly base scenario interest
    const monthly_base_interest = monthly_base_total_paid - loanAmount
    
    // Interest saved compared to standard (same frequency)
    const interest_saved = standard_interest - interest_paid
    
    // Interest saved compared to monthly payments (baseline)
    const interest_saved_vs_monthly = monthly_base_interest - interest_paid

    return {
      years,
      rem_months,
      total_paid,
      interest_paid,
      interest_saved,
      interest_saved_vs_monthly,
      payment_amount: payment_standard,
      monthly_payment: monthly_base_payment,
      overpay_amount: overpay_per_period,
      max_monthly_overpay,
      standard_total: standard_total_paid,
      standard_interest,
      monthly_base_interest,
      loanAmount
    }
  }

  const results = calculateMortgage()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getFrequencyText = () => {
    if (paymentFrequency === 'weekly') return 'Weekly'
    if (paymentFrequency === 'fortnightly') return 'Fortnightly'
    return 'Monthly'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Mortgage Overpayment Calculator
      </h1>
      <div className="text-center mb-8">
        <Link href="/grants" className="text-blue-600 hover:underline text-sm">
          First-Time Buyer? Check Grant Eligibility →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Settings</h2>

            {/* Payment Frequency Toggle */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Frequency
              </Label>
              <ToggleGroup 
                type="single" 
                value={paymentFrequency}
                onValueChange={(value) => value && setPaymentFrequency(value)}
              >
                <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
                <ToggleGroupItem value="fortnightly">Fortnightly</ToggleGroupItem>
                <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Property Price */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Property Price: {formatCurrency(mortgageAmount)}
              </Label>
              <Slider
                min={100000}
                max={600000}
                step={10000}
                value={[mortgageAmount]}
                onValueChange={(value) => setMortgageAmount(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>€100k</span>
                <span>€600k</span>
              </div>
            </div>

            {/* Deposit */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit: {formatCurrency(deposit)}
              </Label>
              <Slider
                min={0}
                max={mortgageAmount - 10000}
                step={1000}
                value={[deposit]}
                onValueChange={(value) => setDeposit(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>€0</span>
                <span>{formatCurrency(mortgageAmount - 10000)}</span>
              </div>
            </div>

            {/* Mortgage Term */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Mortgage Term: {termYears} years
              </Label>
              <Slider
                min={5}
                max={35}
                step={1}
                value={[termYears]}
                onValueChange={(value) => setTermYears(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 years</span>
                <span>35 years</span>
              </div>
            </div>

            {/* Overpayment Percentage */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Overpayment: {overpaymentPercent}% of max allowed (€{results.loanAmount > 0 ? Math.round(results.loanAmount * 0.10 * overpaymentPercent / 100 / (paymentFrequency === 'weekly' ? 52 : 12)) : 0}/{paymentFrequency === 'weekly' ? 'week' : 'month'})
              </Label>
              <Slider
                min={0}
                max={100}
                step={5}
                value={[overpaymentPercent]}
                onValueChange={(value) => setOverpaymentPercent(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Overpayment Years */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Overpayments: {overpaymentYears} years
              </Label>
              <Slider
                min={1}
                max={termYears}
                step={1}
                value={[overpaymentYears]}
                onValueChange={(value) => setOverpaymentYears(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 year</span>
                <span>{termYears} years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Results ({getFrequencyText()} Payments)</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Payoff Time:</span>
                <span className="text-green-700 font-bold">
                  {results.years} years {results.rem_months} months
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Total Paid:</span>
                <span>{formatCurrency(results.total_paid)}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Total Interest:</span>
                <span>{formatCurrency(results.interest_paid)}</span>
              </div>

              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-green-700">Interest Saved:</span>
                <span className="text-green-700 font-bold">
                  {formatCurrency(results.interest_saved)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Payment Breakdown</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Standard {getFrequencyText()} Payment:</span>
                <span>{formatCurrency(results.payment_amount)}</span>
              </div>

              <div className="flex justify-between">
                <span>Additional {getFrequencyText()} Payment:</span>
                <span>{formatCurrency(results.overpay_amount)}</span>
              </div>

              <div className="flex justify-between font-medium border-t pt-2">
                <span>Total {getFrequencyText()} Payment:</span>
                <span>{formatCurrency(results.payment_amount + results.overpay_amount)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Standard Term Comparison</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Standard Total Paid:</span>
                <span>{formatCurrency(results.standard_total)}</span>
              </div>

              <div className="flex justify-between">
                <span>Standard Interest:</span>
                <span>{formatCurrency(results.standard_interest)}</span>
              </div>

              <div className="flex justify-between text-green-600 font-medium">
                <span>Time Saved:</span>
                <span>{termYears - results.years} years {12 - results.rem_months} months</span>
              </div>
            </div>
            
            {/* Monthly Payment Comparison - Only show if not monthly */}
            {paymentFrequency !== 'monthly' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-md font-semibold mb-2 text-blue-700">Monthly vs {getFrequencyText()} Comparison</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span>{formatCurrency(results.monthly_payment || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Total Interest:</span>
                    <span>{formatCurrency(results.monthly_base_interest || 0)}</span>
                  </div>
                  <div className="flex justify-between text-blue-600 font-medium">
                    <span>Interest Saved with {getFrequencyText()}:</span>
                    <span>{formatCurrency(results.interest_saved_vs_monthly || 0)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This calculator assumes a fixed rate of 3.1% (Bank of Ireland's current best first-time buyer rate). 
          Bank of Ireland allows up to 10% overpayments per year on fixed-rate mortgages without penalty. 
          Weekly payments can reduce interest due to more frequent compounding. Always check current terms with your lender.
        </p>
      </div>
    </div>
  )
}
